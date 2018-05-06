"use strict"        // add
var express = require('express');
var router = express.Router();

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

  let product = req.body;
  product._id = Date.now();

  products[product._id] = product;

  res.status(201)
     .json({"product": products[product._id]});
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
             "message": "Product not found.  id=" + req.params.id
         });
   }

    res.status(200)
       .json({"product": product});
  });

module.exports = router;