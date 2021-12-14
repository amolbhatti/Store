const express = require("express");
const braintree = require("braintree");
const router=express.Router();
const {isSignedIn,isAuthenticated}= require("../controllers/authentication");
const {getToken,processPayment}= require("../controllers/gateway")
const {getUserById}= require("../controllers/user");

router.param("userId",getUserById);

router.get("/payment/gettoken/:userId",isSignedIn,isAuthenticated,getToken);

router.post("/payment/braintree/:userId",isSignedIn,isAuthenticated,processPayment);


module.exports=router;