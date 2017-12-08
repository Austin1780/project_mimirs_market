"use strict";

const Express = require("express");
const router = Express.Router();

//access to SQL database
const models = require("../models/sequelize");
const Products = models.Product;
const Categories = models.Category;

router.get("/cart", async function(req, res, next) {
  try {
    res.render("cart");
  } catch (e) {
    res.status(500).send(e.stack);
  }
});

router.get("/cart/checkout", async function(req, res, next) {
  try {
    res.render("checkout");
  } catch (e) {
    res.status(500).send(e.stack);
  }
});

module.exports = router;
