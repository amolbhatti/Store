const express = require("express");
const router=express.Router();
const {signout,signup,signin}= require("../controllers/authentication")
const { check } = require('express-validator');



router.get("/signout",signout);

router.post("/signup",[
    check("name").isLength({ min: 3 }).withMessage('name must be at least 3 chars long'),
    check("email").isEmail().withMessage('Enter a valid email'),
    check("password").isLength({ min: 8 }).withMessage('password should be atleast 8 character long')

],signup);

router.post("/signin",[
    check("email").isEmail().withMessage('Enter a valid email'),
    check("password").isLength({ min: 8 }).withMessage('password field is required')

],signin);









module.exports=router;