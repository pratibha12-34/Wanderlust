const express = require("express");
//import bcrypt here
const authrouter = express.Router();
const authcontroller = require('../../controller/authcontroller');


 authrouter.post("/login",authcontroller.userlogin);
 authrouter.post("/register", authcontroller.userregister);
//      //  res.send({reqbody: req.body, message: "logindata"});
//      const {username, password} = req.body;
//      try{
//           let loggedin = await login.findOne({username, password}); 
//           if(loggedin){
//                return res.json({status:400, msg:"User Logged in Already"});
//           }
//           let newuser = await login.create({username, password});

//           const login = await newuser.save();

//           return res.status(200).json({msg:"user login successfully", user :login.username});
          
//      }
//      catch(err){
//           return res.status(500).json("Error ",err);
//      }
     // const {username, password} = req.body;
     // console.log(username, password);
      //  res.send("logindata");
     // try{
     //      let loggedin = await login.findOne({username, password});

     //      if(loggedin){
     //           return res.status(400).json({msg:"user logged in already"});
     //      }
     //      else{
     //          let newuser = new login ({username, password});

     //           const login = await newuser.save();

     //           res.status(200).json({msg:"user login successfully"});
     //      }
     // }
     // catch(err){
     //      console.log(err);
     //      return res.status(500).json({msg:"error occured"});
     // }
//    console.log(logindata);
// });

// authrouter.post("/register", async (req,res)=>{
//      // res.send("registerdata");
//      // res.send({reqbody:req.body, message:"registerdata"});
//      // destructured the data
//      const {name, email, username, password} = req.body;

//      try{
//           //now we check if user already exists
//           let existinguser = await register.findOne({email});//Mongoose query checking in database 
//           if(existinguser){
//                return res.json({status:400, msg:"User already exists"});
//           }
//           //else create new user or new document in database
//           let newuser = await register.create({name, email, username, password});
          
//           //hash the password before saving for security
//                //write code here

//           //save the new document to database
//           const register = await newuser.save();

//           //send success msg
//           return res.status(200).json({msg:"User Registered Successfully", user:register.email});
//      }
//      catch(err){
//           console.log(err);
//           res.json({status:500, msg:"Error occured"});
          
//      }
    

// });



module.exports = authrouter;