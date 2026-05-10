const booking = require('../models/BookingSchema');
const car = require('../models/CarSchema');
const login = require('../models/LoginSchema');
exports.mybooking = async(req,res)=>{
    try{
        const my_bookings= await booking.find({});
        return res.status(200).json(my_bookings);
    }
    catch(err){
        return res.status(400).json(err);
    }
};
exports.carsadd = async(req,res)=>{
    try{
        let { brand, description, fueltype, mileague, model, imageUrl } =req.body;

        const cars_data = await car.create({ brand, description, fueltype, mileague, model, imageUrl });
        
        return res.status(200).json(cars_data);
    }
    catch(err){
        return res.status(500).json(err);
    }
};

exports.carsupdate = async(req,res)=>{
    try{
        let { brand, description, fueltype, mileague, model, imageUrl } =req.body;

        const cars_data = await car.findOneAndUpdate({ brand, description, fueltype, mileague, model, imageUrl });
        
        return res.status(200).json(cars_data);
    }
    catch(err){
        return res.status(500).json(err);
    }
};
exports.carsdelete = async(req,res)=>{
    try{
        const { id } = req.params;
        const cars_data = await car.findByIdAndDelete(id);
        return res.status(200).json(cars_data);
    }
    catch(err){
        return res.status(500).json(err);
    }
};

exports.GetAllCars = async(req,res)=>{
    try{
        const car_s= await car.find({});
        return res.status(200).json(car_s);
    }
    catch(err){
        return res.status(400).json(err);
    }
};


exports.getuserprofile = async(req,res)=>{
    try{
        // Get username from query params or body
        const username = req.query.username || req.body.username;
        
        if(!username){
            return res.status(400).json({msg:"Username not provided"});
        }
        
        // Find user in login collection
        const user = await login.findOne({username});
        
        if(!user){
            return res.status(404).json({msg:"User not found"});
        }
        
        return res.status(200).json({username: user.username});

    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
};
