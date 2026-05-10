
// connect express to mongodb atlas
const express = require('express'); 
const cors = require('cors');
const connectDB =require( './config/db.js');
// const booking= require('./models/BookingSchema');
// const login= require('./models/LoginSchema');
// const car = require('./models/CarSchema');
// const registermodel= require('./models/RegisterSchema');
const dashboardrouter = require('./routes/api/dashboardroute.js')
const homerouter = require('./routes/api/homeroute.js');
const travelsrouter = require('./routes/api/travelsroute.js');
const authrouter = require('./routes/api/authroute.js');
const app= express();

app.use(express.json());
app.use(cors());



// database Connection
connectDB();





//creating routes
// app.get("/travels/booking",(req,res)=>{
//      const travels_Data={"username":"Pratibha", "Placename":"Kushinagar", "contact":"9399051443", "Pickup_location":"Satna,Madhya Pradesh", "Pick_up_date_and_Time":"06-04-2026 10:17", "Drop_location":"kushinagar,Nagpur,India", "Payment_amount":"6000rs","email":"pratibha122005@gmail.com", "Drop_date":"06-04-2026", "password":"01022005", "car":"ertiga"};
//      const {Placename}="varanasi";
//     const createbooking = async ()=>{
//                 const userbooked = await booking.create(travels_Data);
//                 return req.status(200).json(userbooked);
//             }
//     try{
//         if(Placename === travels_Data.Placename){
//             createbooking();
//             // const createbooking = async ()=>{
//             //     const userbooked = await booking.create(travels_Data);
//             //     return res.status(200).json(userbooked);
//             // }
//         }
//         return req.status(400).statusMessage("NOt found");
//     }
//     catch(err){
//         return res.status(404).json(err);
//     }
// });
// app.get('/dashboard/Mybookings', async (req,res)=>{
//     try{
//         const {username, Placename, email, contact, password, Pickup_location, Pick_up_date_and_Time, Drop_date, Drop_location, car, Payment_amount} = req.body;
//         const mybooking = await booking.create({username, Placename, email, contact, password, Pickup_location, Pick_up_date_and_Time, Drop_date, Drop_location, car, Payment_amount});
//         return res.status(200).json(mybooking);
//     }
//     catch(err){
//         return res.status(400).json(err);
//     }
// //  return res.send("Mybookings page");
// });
// app.get('/dashboard/cars',(req,res)=>{
//     try{

//     }
//     return res.send("cars page");
// })
// app.get('/dashboard',(req,res)=>{
//  return res.send("dashboard page",);
// });
// app.use('/profile',profilerouter);
// app.get('/travels/search/:name',(req,res)=>{
//     res.send(req.params.name);
// })
app.use('/dashboard',dashboardrouter);
app.use('/travels',travelsrouter);
app.use('/auth',authrouter);
app.use('/home', homerouter);
app.use('/payment', require('./routes/api/paymentroute'));
// app.get("/jobs",(req,res)=>{
//    const jobsdata = res.send(req.body);
//     res.send(jobsdata);
//     // jobsdata.map((jobdata)=>{
//     //     console.log((res)=>{
//     //         console.log(res);
//     //     })
//     // })
// })
// app.get("/jobsadd",(req,res)=>{
//     const jobsdata = res.send(req.body);
//     console.log(jobsdata);
//     // res.send("Add jobpost ");
// })
// app.get("/home",(req,res)=>{
//     res.send("Home page");
// })
// app.post("/login",(req,res)=>{
//     //interact data with database
//        // write code here
//    const logindata = res.send(req.body);
//    console.log(logindata);
   
    
    // .then((res=>res.json(req.body)))
    // const logindata = res.send(req.body);
    // console.log(logindata);
    // .catch((err)=>{res.json(err)})
// })

// app.post("/register",(req,res)=>{
//     // const regis_ter= registermodel.find()
//     // res.json(regis_ter)
    
//     const registerdata = res.send(req.body);
//     console.log(registerdata);
//     console.log("register page");
// })

// app.post("/dashboard",(req,res)=>{
//     const dashboarddata = res.send(req.body);
//     console.log(dashboarddata);
//     console.log("dashboard page");
// })

//all requests will come into 5000(backend port)
app.listen(5000,()=>{
    console.log("Server running on 5000 port");
});