"use strict"
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:       { type: String, require: true },
    price:      { type: Number, require: true, Min: 0 },
    expiration: { type: Date, require: false }
});

module.exports = mongoose.model('Product', ProductSchema);