import expressAsyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import dotenv from 'dotenv';
dotenv.config();


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}

const registerUser = expressAsyncHandler(async (req, res) => {

    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !role || !password) {
            res.status(400);
            throw new Error("Please add all fields");
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400);
            throw new Error("User already exists");
        }
        const user = await User.create({ name, email, password, role });
        if (user) {
            res.status(201).json({
                message: "success"
            })
        }
        else {
            res.status(400).json({ message: "Failed to create user" });
            //throw new Error("Invalid user data");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });

    }

});

const authUser = expressAsyncHandler(async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.comparePassword(password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        }
        else {
            res.status(401);
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });

    }

});

const updateUser = expressAsyncHandler(async (req, res) => {
    try {
        if (req.user._id) {
            const { name, email, address, newPassword, oldPassword ,contact } = req.body;
            const user = await User.findOne({ _id: req.user._id });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            if (oldPassword && !(await user.comparePassword(oldPassword))) {
                return res.status(400).json({ message: "Old password is incorrect" });
            }
            user.name = name || user.name;
            user.email = email || user.email;
            user.contact = contact || user.contact;
            user.address = address || user.address;
            if (newPassword) {
                user.password = newPassword;
            }

            await user.save();

            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                contact: user.contact,
                userType: user.userType,
                address: user.address,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

const forgotPassword = expressAsyncHandler(async (req, res) => {

    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (!user)
            return res.status(400).json("User not found!");
        const data = {
            user: {
                email: user.email
            }
        };
        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "5m" });
        const link = `${process.env.FRONTEND}/resetPassword/${user._id}/${token}`
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Password Reset',
            text: `Please use the following link to reset your password: ${link}`
        };
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: "Failed to send email", error });
            } else {
                return res.status(200).json({ message: 'Token sent to email!' });
            }
        });
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});

const resetPassword = expressAsyncHandler(async (req, res) => {


    try {
        const { password } = req.body;
        const { id, token } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json("User not found!");

        const verify = jwt.verify(token, process.env.JWT_SECRET);
        if (!verify) return res.status(401).json("Invalid token");

        if (verify.user.email !== user.email)
            return res.status(400).json("Invalid user");

        user.password = password;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            res.status(401).json({ message: "Token has expired" });
        } else if (err.name === 'JsonWebTokenError') {
            res.status(401).json({ message: "Invalid token" });
        } else {
            console.error(err);
            res.status(500).json({ message: "Internal server error", error: err.message });
        }
    }
});


export { registerUser, authUser, updateUser, forgotPassword, resetPassword }