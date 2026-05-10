const mongoose = require('mongoose');

const register_schema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    username:{type:String, unique:true},
    password:{type:String}

})

module.exports = mongoose.model("register",register_schema);
