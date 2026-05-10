const express = require('express');
const paymentrouter = express.Router();
const paymentcontroller = require('../../controller/paymentcontroller');

paymentrouter.post('/createPaymentIntent', paymentcontroller.createPaymentIntent);
paymentrouter.post('/booking', paymentcontroller.confirmBooking);

module.exports = paymentrouter;
