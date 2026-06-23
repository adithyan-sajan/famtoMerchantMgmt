const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,

    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
    },
    gstin: {
        type: String,
        unique: true,
        sparse: true,
    },
    address: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }
});
const merchantModel = mongoose.model('Merchant', merchantSchema);
module.exports = merchantModel