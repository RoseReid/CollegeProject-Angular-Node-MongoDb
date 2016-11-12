'use strict'
var express = require('express');
var router = express.Router();
var Car = require('./../models/car.js').Model;


router.get("/api/cars", function(req,res){

  Car.find(function (err, cars) {
    if (err) {
      return res.sendStatus(404);
    }
    res.json(cars);
  });

});

router.get("/api/cars/:id", function(req,res){
  var id = req.params.id;
  Car.findById(id, function (err, car) {
    if (err) {
      console.log(err)
      return res.sendStatus(404);
    }
    res.json(car);
  });
});

router.put("/api/cars/:id", function(req,res){
  var carData = req.body;

  Car.findById(req.params.id, function(err, car){
    if (err){
      console.log(err)
      return res.sendStatus(404);
    }else{
      car.set(carData);
      car.save(function(err, carSaved){
        if (err){
          console.log(err)
          return res.sendStatus(404);
        }else{
          res.json(carSaved);
        }
      });
    }
  });
});

router.post("/api/cars", function(req,res){
  var carData = req.body;
  var car = new Car(carData);
  
  car.save(function(err, carSaved){
      if (err){
        console.log(err)
        return res.sendStatus(404);
      }else{
        res.json(carSaved);
      }
    });
    
});

router.delete("/api/cars/:id", function(req,res){
  res.json({
  		price: 50,
  		brand: "Volvo",
  		registrationNumber: "ABC123"
  	});
});

module.exports = router;


