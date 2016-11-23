'use strict'
var Car = require('./../../models/car.js').Model;

exports.getAllCars = function(cb){
	Car.find(cb);
}

exports.getCarById = function(id, cb){
	Car.findById(id, cb);
}

exports.updateCarById = function(id, carData, cb){
Car.findById(id, function(err, car){
    if (err){
      console.log(err)
      return cb(err);
    }else{
      car.set(carData);
      car.save(cb);
    }
  });
}

exports.createCar = function(carData, cb){
	console.log(carData)
	var car = new Car(carData);
  
  car.save(cb);
}

exports.deleteCar = function(id, cb){
	Car.findById(id, function(err, car){
	    if (err){
	      console.log(err)
	      return cb(err);
	    }else{
	      car.remove(cb);
	    }
    });
}