'use strict';

const Customer = require('./customers.js');
const Employee = require('./employees.js');


const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/usedCarShop';
var db  = mongoose.createConnection(url);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('connected to car info')
});

const carSchema = new mongoose.Schema({
	make: {type:String, required:true},
	model: {type:String, required:true},
	year: {type:String, required:true},
	registrationNumber: {type: String, required: true},
	customer: [{type:mongoose.Schema.Types.ObjectId, ref: 'Customer'}],
	employee: [{type:mongoose.Schema.Types.ObjectId, ref: 'Employee'}]
}, {timestamps: true});

exports.Model = db.model('Car', carSchema);


