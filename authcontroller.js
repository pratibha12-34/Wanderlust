const login = require('../models/LoginSchema');
const register = require('../models/RegisterSchema');

exports.userregister = async(req,res)=>{
    const {name, email, username, password} =req.body;
    try{
        const registeruser = await register.findOne({email, username, password});
        if(registeruser){
            return res.status(400).json({msg:"user already exists"});
        }
        let newuser = await register.create({name, email, username, password});
        
        await newuser.save();
        return res.status(200).json({msg:"user registered successfully", user:[name, email, username, password]}).render("/profile");
    }
    catch(err){
        return res.status(500).json({"error": err});
    }

};


exports.userlogin = async(req,res) => {
    const {username, password} = req.body;
    try{
        const registeruser = await register.findOne({username, password});
        const loggedin = await login.findOne({username, password});
        if(registeruser){
            if(loggedin){
                return res.status(200).json({msg:"user logged in already"});

            }
            let newloginuser = await login.create({username, password});
            await newloginuser.save();
            //  res.render("profile");
            return res.status(200).json({msg:"user login successfully", user:[username, password]});
             
        
        }
       return res.status(404).json({msg:'user not registered yet please do register first'});
    }
    catch(err){
        return res.status(500).json({"error":err});
    }
};