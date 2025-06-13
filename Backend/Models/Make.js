const mongoose = require('mongoose');

const makeSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
});

module.exports = new mongoose.model('Make', makeSchema);