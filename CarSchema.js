const mongoose = require('mongoose');

const car_schema = new mongoose.Schema({
    imageUrl: {type: String},
    brand:{type:String},
    model:{type:String},
    fueltype:{type:String},
    description:{type:String},
    mileague:{type:String}
 
});

module.exports = mongoose.model("car",car_schema);
