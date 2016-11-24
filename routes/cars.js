'use strict'
var express = require('express');
var router = express.Router();
// var Car = require('./../models/car.js').Model;
var carRepository = require('./../repository/mongoose/carRepository.js');
// var carRepository = require('./../repository/sequelize/carRepository.js');




router.get("/api/cars", function(req,res){

  carRepository.getAllCars(function (err, cars) {
    if (err) {
      return res.sendStatus(404);
    }
    res.json(cars);
  });

});

router.get("/api/cars/:id", function(req,res){
  var id = req.params.id;
  carRepository.getCarById(id, function (err, car) {
    if (err) {
      console.log(err)
      return res.sendStatus(404);
    }
    res.json(car);
  });
});

router.put("/api/cars/:id", function(req,res){
  var carData = req.body;

carRepository.updateCarById(req.params.id, carData, function(err, carSaved){
        if (err){
          console.log(err)
          return res.sendStatus(404);
        }else{
          res.json(carSaved);
        }
  });
});

router.post("/api/cars", function(req,res){
  var carData = req.body;
 carRepository.createCar(carData, function(err, carSaved){
      if (err){
        console.log(err)
        return res.sendStatus(404);
      }else{
        res.json(carSaved);
      }
    });
    
});

router.delete("/api/cars/:id", function(req,res){
  var id = req.params.id;
    carRepository.deleteCar(req.params.id, function(err, deleteCar){
      if (err){
        console.log(err)
        return res.sendStatus(404);
      }else{
        res.json(deleteCar);
      }
    });
  });

module.exports = router;


