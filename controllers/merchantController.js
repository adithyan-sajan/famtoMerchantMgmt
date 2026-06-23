const crypto = require('crypto'); 
const merchantModel = require('../models/merchantModel'); 
const categoryModel = require('../models/categoryModel'); 

exports.addMerchant = async (req, res) => {
    try {
        let { shopName, ownerName, email, phoneNumber, gstin, address, category } = req.body;
        if (!shopName || !ownerName || !email || !phoneNumber || !address || !category) {
            return res.status(400).json({ message: "All required fields must be filled out" });
        }
        let checkCategory = await categoryModel.findById(category);
        if (!checkCategory) {
            return res.status(404).json({ message: "The selected category does not exist" });
        }
        let checkEmail = await merchantModel.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({ message: "A merchant with this email address already exists" });
        }

        let registrationNumber;
        let isUnique = false;
        while (!isUnique) {
            registrationNumber = crypto.randomInt(10000000, 100000000).toString();
            let existingReg = await merchantModel.findOne({ registrationNumber });
            if (!existingReg) {
                isUnique = true; 
            }
        }

        let newMerchant = new merchantModel({
            shopName,
            ownerName,
            email,
            phoneNumber,
            registrationNumber, 
            gstin,
            address,
            category
        });

        await newMerchant.save();
        res.status(201).json({ message: "Merchant registered successfully", merchant: newMerchant });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong in Server" });
    }
};

exports.getAllMerchants = async (req, res) => {
    try {
        let merchants = await merchantModel.find().populate('category');
        res.status(200).json({ message: "Merchants fetched successfully", merchants });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong in Server" });
    }
};

exports.getSingleMerchant = async (req, res) => {
    try {
        let { id } = req.params;
        let merchant = await merchantModel.findById(id).populate('category');

        if (!merchant) {
            return res.status(404).json({ message: "Merchant not found" });
        } else {
            res.status(200).json({ message: "Merchant details fetched successfully", merchant });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong in Server" });
    }
};

exports.updateMerchant = async (req, res) => {
    try {
        let { id } = req.params; 
        let updatedMerchant = await merchantModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedMerchant) {
            return res.status(404).json({ message: "Merchant not found" });
        } else {
            res.status(200).json({ message: "Merchant details updated successfully", merchant: updatedMerchant });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong in Server" });
    }
};

exports.deleteMerchant = async (req, res) => {
    try {
        let { id } = req.params;
        let deletedMerchant = await merchantModel.findByIdAndDelete(id);

        if (!deletedMerchant) {
            return res.status(404).json({ message: "Merchant not found" });
        } else {
            res.status(200).json({ message: "Merchant deleted successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong in Server" });
    }
};