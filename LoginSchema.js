const mongoose = require('mongoose');

const login_schema = new mongoose.Schema({
    // name:{type:String, required:true},
    // email:{type:String, required:true, unique},
    username:{type:String, unique:true},
    password:{type:String, unique:true}

})

module.exports =  mongoose.model("login",login_schema);

