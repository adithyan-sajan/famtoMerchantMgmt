const categoryModel = require('../models/categoryModel');

exports.addCategory = async (req, res) => {
    try {
        let { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }
        let existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }
        let newCategory = new categoryModel({ name });
        let savedCategory = await newCategory.save();
        res.status(201).json({
            message: "Category created successfully",
            category: savedCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong in Server" });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        let allCategories = await categoryModel.find();
        res.status(200).json({ message: "Categories fetched successfully", allCategories });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong in Server" });
    }
};