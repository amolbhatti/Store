const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 const {ObjectId}=Schema;


 const ProductCartSchema = new Schema({
    product:{
      type:ObjectId,
      ref:"Product"
    },
    name:String,
    count: Number,
    price: Number
},
{timestamps:true}
);

const ProductCart=mongoose.model("ProductCart",ProductCartSchema)

 const orderSchema=new Schema({

     products:[ProductCartSchema],
     transaction_id:{},
     amount:{type:Number},
     address: String,
     status:{
         type:String,
        default:"Recieved",
        enum:["Cancelled","Delivered","Shipped","Processing","Recieved"]
     },
     updated:Date,
     user:{
         type:ObjectId,
         ref:"User"
     }
 },
 {timestamps:true}
 );

 const order=mongoose.model("Order",orderSchema);

 

 


 module.exports={order,ProductCart};