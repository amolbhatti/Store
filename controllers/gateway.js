var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "pjygvrx57q399s7d",
  publicKey: "fk7dt4b26jgfvxcz",
  privateKey: "dcf62c66ae2f2e6e6d2bbe52056f04b6",
});

exports.getToken = (req,res) => {
  gateway.clientToken.generate(
    {},
    function (err, response) {
     if(err){
         res.status(500).send(err)
     }else{
         res.send(response)
     }
    }
  );
};

exports.processPayment = (req,res) => {

    const nonceFromTheClient=req.body.paymentMethodNonce
    const amount=req.body.amount
    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(result)
        }

      });

};
