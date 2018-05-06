"use strict"        // add
var express = require('express');
var router = express.Router();

var products = [];      // Temporal "database"

/* POST a new product. */
router.post('/', function(req, res, next) {
  console.log("Product.CREATE: " + req.body);

  if(!req.body)
  {
    res.status(403)
       .json({
            "error": true,
            "message": "Request body is empty!"
        });
  }

  let product = req.body;
  product._id = Date.now();

  products[product._id] = product;

  res.status(201)
     .json({"product": products[product._id]});
});

module.exports = router;
