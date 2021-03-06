const express = require("express");
const router=express.Router();
const {isSignedIn,isAuthenticated,isAdmin}= require("../controllers/authentication");
const {getUserById,getUser,updateUser,userPurchaselist}= require("../controllers/user");

router.param("userId",getUserById);

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);
router.get("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaselist);

module.exports=router;