"use strict";

const Express = require("express");
const router = Express.Router();
const cart = require("./cart");
const admin = require("./admin");

//access to SQL database
const models = require("../models/sequelize");
const Products = models.Product;
const Categories = models.Category;

router.get("/", async function(req, res, next) {
  try {
    let productsResults = await Products.findAll();
    let categoriesResults = await Categories.findAll();

    res.render("welcome/index", {
      products: productsResults,
      categories: categoriesResults,
      resultsDescription: "all products in all categories:"
    });
  } catch (e) {
    res.status(500).send(e.stack);
  }
});

router.post("/products/searchbyname/", async function(req, res, next) {
  try {
    let result = await Products.findAll({
      where: { name: { $ilike: `%${req.body.search}%` } }
    });
    let categoriesResults = await Categories.findAll();

    res.render("welcome/index", {
      products: result,
      categories: categoriesResults,
      resultsDescription: `search results for "${req.body.search}":`
    });
  } catch (e) {
    res.status(500).send(e.stack);
  }
});

router.post("/products/filter", async function(req, res, next) {
  try {
    let result = await Products.findAll();
    let resultsDescribe = `products in all categories, priced between $${
      req.body.minprice
    } to $${req.body.maxprice}:`;
    if (req.body.categories === "All") {
      result = await Products.findAll({
        where: {
          price: {
            $lte: Number(req.body.maxprice),
            $gte: Number(req.body.minprice)
          }
        }
      });
    } else {
      resultsDescribe = `products in the ${
        req.body.categories
      } category, priced between $${req.body.minprice} to $${
        req.body.maxprice
      }:`;
      result = await Products.findAll(
        {
          include: [
            {
              model: Categories,
              where: {
                name: req.body.categories
              }
            }
          ]
        },
        {
          where: {
            price: {
              $lte: Number(req.body.maxprice),
              $gte: Number(req.body.minprice)
            }
          }
        }
      );
    }

    let categoriesResults = await Categories.findAll();

    res.render("welcome/index", {
      products: result,
      categories: categoriesResults,
      resultsDescription: resultsDescribe
    });
  } catch (e) {
    res.status(500).send(e.stack);
  }
});

router.post("/products/sort", async function(req, res, next) {
  try {
    let result = await Products.findAll();
    let resultsDescribe = "all products in all categories:";
    switch (req.body.sort) {
      case "Name Ascending":
        result = await Products.findAll({
          order: ["name"]
        });
        resultsDescribe = "all products sorted alphabetically:";
        break;
      case "Name Descending":
        result = await Products.findAll({
          order: [["name", "DESC"]]
        });
        resultsDescribe = "all products sorted by name descending:";
        break;
      case "Price Ascending":
        result = await Products.findAll({
          order: ["price"]
        });
        resultsDescribe = "all products sorted by price ascending:";
        break;
      case "Price Descending":
        result = await Products.findAll({
          order: [["price", "DESC"]]
        });
        resultsDescribe = "all products sorted by price descending:";
        break;
      default:
        result = await Product.findAll();
    }

    let categoriesResults = await Categories.findAll();

    res.render("welcome/index", {
      products: result,
      categories: categoriesResults,
      resultsDescription: resultsDescribe
    });
  } catch (e) {
    res.status(500).send(e.stack);
  }
});

router.get("/cart", cart);
router.get("/cart/checkout", cart);
router.get("/admin/orders", admin);
router.get("/admin/analytics", admin);
router.get("/admin/orders/:order", admin);

module.exports = router;
