const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const db = require("../models");
const handler = require('../utils/handleRequiredBody')


router.get("/sales", async (req, res,next) => {

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
  
  router.get("/sales/:id", async (req, res) => {
    const sale = await db.Sale.findByPk(req.params.id, {
      include: db.ProductType,
    });
    res.json(sale);
  });
  
  router.post("/sales",handler(['product_name','quantity','amount','product_type_id']), async (req, res, next) => {
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
  
  router.put("/sales/:id", async (req, res) => {
    const sale = await db.Sale.findByPk(req.params.id);
    sale.update(req.body);
    res.json(sale);
  });
  
  router.delete("/sales/:id", async (req, res) => {
    const sale = await db.Sale.findByPk(req.params.id);
    sale.destroy();
    res.json({ message: "Sale deleted" });
  });

  module.exports = router;