const express = require("express");
const homerouter = express.Router();
// const job_model= require('../../models/JobsSchema');

homerouter.get("/",(req,res)=>{
    //  const jobsdata = res.send(req.body);
    res.send("home");
    //  console.log(jobsdata);
    // jobsdata.map((jobdata)=>{
    //     console.log((res)=>{
    //         console.log(res);
    //     })
    // })
})

module.exports = homerouter;