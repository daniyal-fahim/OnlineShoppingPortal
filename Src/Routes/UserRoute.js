import express from "express";
import { register } from "../Controller/User_Seller/RegisterUser.js";
import { login } from "../Controller/User_Seller/LoginUser.js";
import { EmailSender } from "../Controller/OTP/EmailSender.js";
import { Islogin } from "../Controller/User_Seller/IsLogin.js";
import { CheckOTP } from "../Controller/OTP/CheckOTP.js";
import { Logout } from "../Controller/User_Seller/Logout.js";

const router = express.Router();

// User registration route
router.post("/register", (req, res) => {
    console.log(req.body); // Debug log
    register(req, res);
});

// User login route
router.post("/log", (req, res) => {
    console.log(req.body); // Debug log
    login(req, res);
});

// Check if user is logged in
router.post("/islogin", (req, res) => {
    console.log("Cookies received:", req.cookies);
    Islogin(req, res);
});

// Email sending route
router.post("/send-email", (req, res) => {
    console.log("Cookies received:", req.cookies);
    EmailSender(req, res);
});

// OTP verification route
router.post("/verify-otp", (req, res) => {
    CheckOTP(req, res);
});

// Logout route
router.post("/logout", (req, res) => {
    Logout();
});

export default router;
