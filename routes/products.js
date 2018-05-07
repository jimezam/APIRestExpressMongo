"use strict"        // add
var express = require('express');
var router = express.Router();

var Product = require('../database/models/Product');        // add

var products = {};      // Temporal "database"

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
    
    // Mongoose

    var params = req.body;

    Product.create(params)
        .then(product => {
            res.status(201)
               .json({"product": product});

            next();
        }).catch(err => {
            res.status(403)
               .json({
                   "error": true,
                   "message": err
               });     

            next(err);
    });

    // /Mongoose

    /*
    let product = req.body;
    product._id = Date.now();

    products[product._id] = product;

    res.status(201)
        .json({"product": products[product._id]});
    */
});

/* GET all products. */
router.get('/', function(req, res, next) {
    console.log("Product.GET: " + req.body);
  
    var productValues = Object.keys(products).map(k => products[k]);

    res.status(200)
       .json({"products": productValues});
});

/* GET a particular product. */
router.get('/:id', function(req, res, next) {
    console.log("Product.GET: " + req.params.id);
  
    if(!req.params.id)
    {
      res.status(403)
         .json({
              "error": true,
              "message": "There is no 'id' parameter!"
          });
    }

    let product = products[req.params.id];

    if(product === undefined)
    {
        res.status(404)
        .json({
             "error": true,
             "message": "Product not found. id=" + req.params.id
         });
   }

    res.status(200)
       .json({"product": product});
});

/* PUT a particular product. */
router.put('/:id', function(req, res, next) {
    console.log("Product.PUT: " + req.params.id);
  
    if(!req.body)
    {
      res.status(403)
         .json({
              "error": true,
              "message": "Request body is empty!"
          });
    }
  
    if(!req.params.id)
    {
      res.status(403)
         .json({
              "error": true,
              "message": "There is no 'id' parameter!"
          });
    }

    let product = req.body;
    product._id = parseInt(req.params.id, 10);
    products[product._id] = product;

    res.status(200)
       .json({"product": product});
});

/* DELETE a particular product. */
router.delete('/:id', function(req, res, next) {
    console.log("Product.DELETE: " + req.params.id);
  
    if(!req.params.id)
    {
      res.status(403)
         .json({
              "error": true,
              "message": "There is no 'id' parameter!"
          });
    }

    var id = parseInt(req.params.id, 10);
    var product = products[id];

    if(product === undefined)
    {
        res.status(404)
        .json({
             "error": true,
             "message": "Product not found. id=" + req.params.id
         });
   }

    delete (products[id]);

    res.status(200)
       .json({"product": product});
});
  
module.exports = router;