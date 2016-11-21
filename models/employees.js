'use strict';


const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/usedCarShop';
var db  = mongoose.createConnection(url);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('connected to employee info')
});

const employeeSchema = new mongoose.Schema({
	name: {type:String, required:true},
	age: {type:String, required:true},
	phoneNumber: {type: String, required: true},	
}, {timestamps: true});

exports.Model = db.model('Employee', employeeSchema);