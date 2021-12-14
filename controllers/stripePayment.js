const stripe=require("stripe")("sk_test_51HKAC6GcejTQJKnXzg0kO9NjJMK7tJutdHgT2VKMv6x3bNHl0sUBenpCcP1TAU26tVK91bJEyyXSJmyzdkide9Et00GhFLoRlb")
const uuid = require('uuid-random');

exports.makePayment=(req,res)=>{
    const {products,token}=req.body
    let amount = 0;
    products.map((p) => (amount = amount + p.price));

    const idempotencyKey=uuid();

    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(customer=>{
        stripe.charges.create({
            amount:amount,
            currency:'usd',
            customer:customer.id,
            receipt_email:token.email
        },{idempotencyKey})
        .then(result=>res.status(200).json(result))
        .catch(err=>console.log(err))
    })

}