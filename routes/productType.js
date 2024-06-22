const express = require('express');
const router = express.Router();
const handler = require('../utils/handleRequiredBody')
const db = require("../models");

router.get("/product-types", async (req, res) => {
    const productTypes = await db.ProductType.findAll();
    res.json(productTypes);
  });
  
  router.get("/product-types/:id", async (req, res) => {
    const productType = await db.ProductType.findByPk(req.params.id);
    res.json(productType);
  });
  
  router.post(
    "/product-types",
    handler(["name"]),
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
  
  router.put(
    "/product-types/:id",
    handler(["name"]),
    async (req, res) => {
      const productType = await db.ProductType.findByPk(req.params.id);
      productType.update(req.body);
      res.json(productType);
    }
  );
  
  router.delete("/product-types/:id", async (req, res) => {
    const productType = await db.ProductType.findByPk(req.params.id);
    productType.destroy();
    res.json({ message: "Product Type deleted" });
  });
  


  module.exports = router;