const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    usn_no: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    }
});

module.exports = Request = mongoose.model('request', RequestSchema);