const express = require("express");
const router=express.Router();

const {isSignedIn,isAuthenticated,isAdmin}= require("../controllers/authentication");
const {getUserById,pushOrderInPurchaseList}= require("../controllers/user");
const {updateStock}=require("../controllers/product");
const {getorderById,createOrder,getAllOrder,getOrderStatus,updateStatus}= require("../controllers/order");

router.param("userId",getUserById);
router.param("orderId",getorderById);

// routes
router.post("/order/create/:userId",isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder);
router.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrder);
router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus);
router.put("/order/:orderId/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus);




module.exports=router;