'use strict'
const util = require('util');
const express = require('express');
const carRepository = require('./../repository/mongoose/carRepository.js');

const router = express.Router();

const getAllCars = util.promisify(carRepository.getAllCars);
const getCarById = util.promisify(carRepository.getCarById);
const updateCarById = util.promisify(carRepository.updateCarById);
const createCar = util.promisify(carRepository.createCar);
const deleteCar = util.promisify(carRepository.deleteCar);

router.get("/api/cars", async (req,res) => {
  try {
    const cars = await getAllCars();
    return res.json(cars);
  } catch (e) {
    return res.sendStatus(404);
  }
});

router.get("/api/cars/:id", async (req,res) => {
  try {
    const id = req.params.id;
    const car = await getCarById(id);
    return res.json(car);
  } catch (e) {
    return res.sendStatus(404);
  }
});

router.put("/api/cars/:id", async (req,res) => {
  try {
    const carData = req.body;
    const id = req.params.id;
    const carSaved = await updateCarById(id, req.body);
    return res.json(carSaved);
  } catch (e) {
    return res.sendStatus(404);
  }
});

router.post("/api/cars", async (req,res) => {
  try {
    const carData = req.body;
    const carSaved = await createCar(carData);
    return res.json(carSaved);
  } catch (e) {
    return res.sendStatus(404);
  }
});

router.delete("/api/cars/:id", async (req,res) => {
  try {
    const id = req.params.id;
    const result = await deleteCar(id);
    return res.json(result);
  } catch (e) {
    return res.sendStatus(404);
  }
});

module.exports = router;


