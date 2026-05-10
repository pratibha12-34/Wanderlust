const express = require('express');
const travelsrouter = express.Router();
const travelscontroller = require('../../controller/travelscontroller');

travelsrouter.get("/GetAllTravels",travelscontroller.GetAllTravels);
travelsrouter.post("/travelsadd",travelscontroller.travelsadd);
travelsrouter.post("/travelsupdate",travelscontroller.travelsupdate);
travelsrouter.delete("/delete/:id",travelscontroller.travelsdelete);
travelsrouter.post("/payment/createPaymentIntent",travelscontroller.createPaymentIntent);

travelsrouter.get("/searchbyid/:id",travelscontroller.gettravelsbyId);
travelsrouter.get("/searchbyname/:name",travelscontroller.gettravelsbyName);
    //  const jobsdata = res.send(req.body);
    // return res.send("All jobs");
    //  console.log(jobsdata);
//    return(
//      jobsdata.map((jobdata)=>{
//         return(
//             <li key={jobdata}>
//                 <h2>JobTitle:{jobdata.JobTitle}</h2>
//                 <h3>Company:{jobdata.Company}</h3>
//                 <h3>Location:{jobdata.Location}</h3>
//                 <h3>Description:{jobdata.Description}</h3>
//                 <h3>Posted Date:{jobdata.Posted_Date}</h3>

//                 <a href={jobdata.ApplyLink}>

//                     <button> Apply here</button>
//                 </a>
//             </li>
//         )
//         })
//    )
    // })


// jobrouter.post("/jobsadd",(req,res)=>{
//     //  let jobsdata = req;
//     res.send("hii");
    //  console.log(jobsdata);
    //  res.send({reqbody: req.body, message: "jobsadddata"});
    // jobsdata.map((jobdata)=>{
    //     console.log((res)=>{
    //         console.log(res);
    //     })
    // })
// })


// jobrouter.post("/jobsupdate",(req,res)=>{
//     //  let jobsdata = req;
//     // // res.send("hii");
//     //  console.log(jobsdata);
//      res.send("update jobs");
    // jobsdata.map((jobdata)=>{
    //     console.log((res)=>{
    //         console.log(res);
    //     })
    // })
// })


// jobrouter.post("/jobsdelete",(req,res)=>{
//     //  let jobsdata = req;
//     // // res.send("hii");
//     //  console.log(jobsdata);
//      res.send("Delete jobs");
    // jobsdata.map((jobdata)=>{
    //     console.log((res)=>{
    //         console.log(res);
    //     })
    // })
// })

// jobrouter.get("/jobssearch/:id",(req,res)=>{
//     //  let jobsdata = req;
//     // // res.send("hii");
//     //  console.log(jobsdata);
//      res.send("show jobs through job id search");
    // jobsdata.map((jobdata)=>{
    //     console.log((res)=>{
    //         console.log(res);
    //     })
    // })
// })
// jobrouter.get("/jobssearch/:name",(req,res)=>{
//     //  let jobsdata = req;
//     // // res.send("hii");
//     //  console.log(jobsdata);
//      res.send("show jobs through jobtitle search");
    // jobsdata.map((jobdata)=>{
    //     console.log((res)=>{
    //         console.log(res);
    //     })
    // })
// })


module.exports = travelsrouter;