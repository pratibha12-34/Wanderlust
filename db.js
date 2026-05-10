// const express = require('express');
const mongoose = require('mongoose');

const connectDB =()=>{mongoose.connect("mongodb+srv://jobportal:root@register.gapcghu.mongodb.net/travels?appName=register")
.then(()=>{console.log("MongoDB connected Successfully!!!")})
.catch((err)=>console.log(err))};

// let db = connectDB((res)=>{
//     console.log(res);
// });



module.exports = connectDB;