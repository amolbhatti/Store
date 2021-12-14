const {order,ProductCart} =require("../models/order");

exports.getorderById=(req,res,next,id)=>{
    order.findById(id)
    .populate("products.product","name price")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"NO order found"
            });
        }
        req.order=order;
        next();
    });

}

exports.createOrder=(req,res)=>{
    req.body.order.user=req.profile;
    const Order =new order(req.body.order);
    Order.save((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"failed to save your order"
            });
        }
        res.json(order);
    });
}

exports.getAllOrder=(req,res)=>{
    Order.find()
        .populate("user","_id name")
        .exec((err,order)=>{
            if(err){
                return res.status(400).json({
                    error:"No order found"
                });
            }
            res.json(order);
        });
}

exports.getOrderStatus=(req,res)=>{
res.json(order.schema.path("status").enumValues);
}

exports.updateStatus=(req,res)=>{
    order.update(
        {_id:req.body.orderId},
        {$set: req.body.status},
        (err,order)=>{
            if(err){
                return res.status(400).json({
                    error:"cannot update status"
                });
            }
            res.json(order);
        }
    );

}