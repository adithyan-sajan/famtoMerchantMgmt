const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

exports.loginUser = async (req, res) => {
    try {
        let { username, password } = req.body;
        let existingUser = await userModel.findOne({ username });
        if (!existingUser) {
            return res.status(404).json({ message: "User with this username is not registered, please register" });
        } else {
            let isPswdMatch = await bcrypt.compare(password, existingUser.password);
            if (isPswdMatch) {
                let payload = {
                    username: existingUser.username,
                    role: existingUser.role
                }
                let token = await jwt.sign(payload, process.env.JWT_SECRET);
                res.status(200).json({ message: "Login successfull", token, role: existingUser.role })
            } else {
                res.status(401).json({ message: "Incorrect password" })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong in Server" })
    }
}
exports.registerUser = async (req, res) => {
    try {
        let { username, password } = req.body;
        let existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User with this username already exists" });
        } else {
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(password, salt);
            let newUser = new userModel({
                username,
                password: hashedPassword
            });
            await newUser.save();
            res.status(201).json({ message: "User registered successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong in Server" })
    }
}