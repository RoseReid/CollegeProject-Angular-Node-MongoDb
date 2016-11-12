'use strict'
var express = require('express');
var router = express.Router();
var Employee = require('./../models/employees.js').Model;


router.get("/api/employees", function(req,res){

  Employee.find(function (err, employees) {
    if (err) {
      return res.sendStatus(404);
    }
    res.json(employees);
  });

});

router.get("/api/employees/:id", function(req,res){
  var id = req.params.id;
  Employee.findById(id, function (err, employee) {
    if (err) {
      console.log(err)
      return res.sendStatus(404);
    }
    res.json(employee);
  });
});

router.put("/api/employees/:id", function(req,res){
  var employeeData = req.body;

  Employee.findById(req.params.id, function(err, employee){
    if (err){
      console.log(err)
      return res.sendStatus(404);
    }else{
      employee.set(employeeData);
      employee.save(function(err, employeeSaved){
        if (err){
          console.log(err)
          return res.sendStatus(404);
        }else{
          res.json(employeeSaved);
        }
      });
    }
  });
});

router.post("/api/employees", function(req,res){
  var employeeData = req.body;
  var employee = new Employee(employeeData);
  
  employee.save(function(err, employeeSaved){
      if (err){
        console.log(err)
        return res.sendStatus(404);
      }else{
        res.json(employeeSaved);
      }
    });
    
});


router.delete("/api/employees/:id", function(req,res){
  var id = req.params.id;
  Employee.findById(id, function (err, employee) {
    Employee.findById(req.params.id, function(err, employee){
    if (err){
      console.log(err)
      return res.sendStatus(404);
    }else{
      employee.remove(function(err, employeeRemoved){
        if (err){
          console.log(err)
          return res.sendStatus(404);
        }else{
          res.json(employeeRemoved);
        }
      });
    }
    });
  });
});


module.exports = router;

