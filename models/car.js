const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let carSchema = new Schema({
    brand: { type: String, required: true },
    type: { type: String, required: true },
    consumption: { type: String, required: true },
    date: { type: String, required: true },
    price: { type: Number, required: true, max: 10000000 },
    quantity: { type: Number, required: true, max: 1000000 },
});

module.exports = mongoose.model('car', carSchema);