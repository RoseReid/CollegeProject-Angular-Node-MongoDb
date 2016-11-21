'use strict';

// const questionInfo = require('./employee.js');
// const clientInfo = require('./customer.js');

const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/usedCarShop';
var db  = mongoose.createConnection(url);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('connected to customer info')
  // we're connected!
});

const customerSchema = new mongoose.Schema({
	name: {type:String, required:true},
	age: {type:String, required:true},
	phoneNumber: {type: String, required: true},
	address: {
		name: String, 
	    address: String, 
	    city: String, 
	    state: String, 
	    country: String, 
	    zipCode: Number, 
	    createdOn: Date, 
	    isActive:  Boolean
	}
}, {timestamps: true});

exports.Model = db.model('Customer', customerSchema);