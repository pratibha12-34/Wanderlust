const stripe = require('stripe')('sk_test_51TGZW8IJosy8wL34Gob0snNBKGJnZtkX9P3iX6tzGnWtk946i6QBmUjugcEMPHwOd27wxCDA8SsMdKE0HqOZzMpd00IgYGAoPv'); // Replace with your Stripe secret key
const booking = require('../models/BookingSchema');
const travels = require('../models/TravelsSchema');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, metadata } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'inr',
      metadata: metadata || {},
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.confirmBooking = async (req, res) => {
  try {
    const { payment_intent, ...bookingData } = req.body;
    const { username, Placename, email, password, contact, Pickup_location, Pickup_date_and_Time, Drop_date, car, Payment_amount, Drop_location, metadata } = bookingData;
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
    if (paymentIntent.status === 'succeeded') {
      const booking_data = await booking.create({
        username, Placename, email, password, contact, Pickup_location, Pickup_date_and_Time, Drop_date, car, Payment_amount, Drop_location, 
        stripe_payment_intent_id: payment_intent, 
        payment_status: 'paid', 
        type_of_booking: metadata.type || 'tour'
      });
      res.status(200).json(booking_data);
    } else {
      res.status(400).json({ error: 'Payment not successful' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
