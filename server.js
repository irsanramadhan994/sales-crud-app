// server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const errorHandler = require("./middleware/errorHandler");
const { Op } = require('sequelize');

const app = express();
const cors = require('cors')
app.use(bodyParser.json());
app.use(errorHandler);
app.use(cors())
// Connect to the database
db.sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

const requiredFieldsMiddleware = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      const error = new Error(
        `Missing required fields: ${missingFields.join(", ")}`
      );
      error.status = 400;
      return next(error);
    }
    next();
  };
};

// CRUD endpoints for Sales
app.get("/sales", async (req, res,next) => {

  try {
    const { name } = req.query;
    const filter = {};
    console.log(req.query)
    if (name) {
      filter.product_name = { [Op.iLike]: `%${name}%` }
    }
    const sales = await db.Sale.findAll({
      include: db.ProductType,
      where:filter
    });
    res.json(sales);

  } catch (error) {
      next(error)
  }

 
});

app.get("/sales/:id", async (req, res) => {
  const sale = await db.Sale.findByPk(req.params.id, {
    include: db.ProductType,
  });
  res.json(sale);
});

app.post("/sales", async (req, res, next) => {
  const { product_name, quantity, amount, product_type_id } = req.body;
  try {
    const newSale = await db.Sale.create({
      product_name,
      quantity,
      amount,
      product_type_id,
    });

    res.json(newSale);
  } catch (error) {
    next(error);
  }
});

app.put("/sales/:id", async (req, res) => {
  const sale = await db.Sale.findByPk(req.params.id);
  sale.update(req.body);
  res.json(sale);
});

app.delete("/sales/:id", async (req, res) => {
  const sale = await db.Sale.findByPk(req.params.id);
  sale.destroy();
  res.json({ message: "Sale deleted" });
});

// CRUD endpoints for ProductTypes
app.get("/product-types", async (req, res) => {
  const productTypes = await db.ProductType.findAll();
  res.json(productTypes);
});

app.get("/product-types/:id", async (req, res) => {
  const productType = await db.ProductType.findByPk(req.params.id);
  res.json(productType);
});

app.post(
  "/product-types",
  requiredFieldsMiddleware(["name"]),
  async (req, res, next) => {
    try {
      const existingProduct = await db.ProductType.findOne({ where: { name: req.body.name } });
      if (existingProduct) {
        return res.status(409).json({error:'Product Type name already exist'});
      }
      const sale = await db.ProductType.create(req.body);
      res.json(sale);
    } catch (err) {
      next(err);
    }
  }
);

app.put(
  "/product-types/:id",
  requiredFieldsMiddleware(["name"]),
  async (req, res) => {
    const productType = await db.ProductType.findByPk(req.params.id);
    productType.update(req.body);
    res.json(productType);
  }
);

app.delete("/product-types/:id", async (req, res) => {
  const productType = await db.ProductType.findByPk(req.params.id);
  productType.destroy();
  res.json({ message: "Product Type deleted" });
});

app.use((err, req, res, next) => {
  console.log(err)
  if (err.status === 400) {
    res.status(400).json({ error: err.message });
  } else if(err.status === 500) {
    res.status(500).json({ error: "Internal Server Error",msg:err.message });
  }else
  next(err)
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
