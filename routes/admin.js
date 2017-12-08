"use strict";

const Express = require("express");
const router = Express.Router();

//access to SQL database
const models = require("../models/sequelize");
const Products = models.Product;
const Categories = models.Category;

router.get("/admin/orders", async function(req, res, next) {
  try {
    res.render("orders");
  } catch (e) {
    res.status(500).send(e.stack);
  }
});

router.get("/admin/orders/:order", async function(req, res, next) {
  try {
    res.render("showOrder");
  } catch (e) {
    res.status(500).send(e.stack);
  }
});

router.get("/admin/analytics", async function(req, res, next) {
  try {
    res.render("analytics");
  } catch (e) {
    res.status(500).send(e.stack);
  }
});

module.exports = router;
