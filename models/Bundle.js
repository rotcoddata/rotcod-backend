const mongoose = require('mongoose');

const bundleSchema = new mongoose.Schema({
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    soldTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Bundle', bundleSchema);