'use strict'
var express = require('express');
var router = express.Router();
var Customer = require('./../models/customers.js').Model;


router.get("/api/customers", function(req,res){

  Customer.find(function (err, customers) {
    if (err) {
      return res.sendStatus(404);
    }
    res.json(customers);
  });

});

router.get("/api/customers/:id", function(req,res){
  var id = req.params.id;
  Customer.findById(id, function (err, customer) {
    if (err) {
      console.log(err)
      return res.sendStatus(404);
    }
    res.json(customer);
  });
});

router.put("/api/customers/:id", function(req,res){
  var customerData = req.body;

  Customer.findById(req.params.id, function(err, customer){
    if (err){
      console.log(err)
      return res.sendStatus(404);
    }else{
      customer.set(customerData);
      customer.save(function(err, customerSaved){
        if (err){
          console.log(err)
          return res.sendStatus(404);
        }else{
          res.json(customerSaved);
        }
      });
    }
  });
});

router.post("/api/customers", function(req,res){
  var customerData = req.body;
  var customer = new Customer(customerData);
  
  customer.save(function(err, customerSaved){
      if (err){
        console.log(err)
        return res.sendStatus(404);
      }else{
        res.json(customerSaved);
      }
    });
    
});

router.delete("/api/customers/:id", function(req,res){
  var id = req.params.id;
  Customer.findById(id, function (err, customer) {
    Customer.findById(req.params.id, function(err, customer){
    if (err){
      console.log(err)
      return res.sendStatus(404);
    }else{
      customer.remove(function(err, customerRemoved){
        if (err){
          console.log(err)
          return res.sendStatus(404);
        }else{
          res.json(customerRemoved);
        }
      });
    }
    });
  });
});

module.exports = router;

