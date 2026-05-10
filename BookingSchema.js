const mongoose = require('mongoose');

const booking_schema = new mongoose.Schema({
    username:{type:String, required:true},
    Placename:{type:String, required:true},
    email:{type:String, required:true},
    contact:{type:String},
    password:{type:String},
    Pickup_location:{type:String},
    Pickup_date_and_Time:{type:String},
    Drop_location:{type:String},
    Drop_date:{type:String},
    car:{type:String},
Payment_amount:{type:Number},
   payment_status:{type: String, default: 'pending'},
      stripe_payment_intent_id:{type: String},
         type_of_booking:{type: String}

})

module.exports =  mongoose.model("booking",booking_schema);

