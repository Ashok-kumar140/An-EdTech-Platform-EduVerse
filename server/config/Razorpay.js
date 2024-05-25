const Razorpay = require('razorpay');

exports.RazorpayConfig = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
})
