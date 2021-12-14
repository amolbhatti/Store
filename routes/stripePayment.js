const express = require("express");
const router=express.Router();
const {makePayment}= require("../controllers/stripePayment");
const {isSignedIn,isAuthenticated}= require("../controllers/authentication")

router.post("/stripepayment",isSignedIn,isAuthenticated,makePayment)



module.exports=router;