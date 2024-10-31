const express = require("express");
const router = express.Router();
const authService = require("../service/AuthService");
const { verifyToken } = require("../middleware/VerifyToken")
router.get("/", authService.getUser);
router.post("/login", authService.login)
router.post("/send_otp", authService.sendOTPRegister)
router.post("/register_otp", authService.register)
router.post('/send_otp_forgot', authService.sendOTPForgotPassword)
router.post('/check-change-password', verifyToken, authService.checkChangePassword)
router.post('/save-change-password', verifyToken, authService.saveChangePass)
router.post('/forgot-password', authService.forgotPassword)
module.exports = router;
