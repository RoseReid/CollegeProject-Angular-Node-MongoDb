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
	phoneNumber: {type: String, required: true}
	// customer: [{type: mongoose.Schema.Types.ObjectId, ref: 'customer'}],
	// employee: [{type: mongoose.Schema.Types.ObjectId, ref: 'employee'}],
}, {timestamps: true});

exports.Model = db.model('customer', customerSchema);