const express = require('express');
const dashboardcontroller = require('../../controller/dashboardcontroller');
const dashboardrouter= express.Router();

dashboardrouter.get('/Mybookings',dashboardcontroller.mybooking);
dashboardrouter.get('/GetAllCars',dashboardcontroller.GetAllCars);
dashboardrouter.post('/carsadd',dashboardcontroller.carsadd);
dashboardrouter.post('/carsupdate',dashboardcontroller.carsupdate);
dashboardrouter.delete('/delete/:id',dashboardcontroller.carsdelete);
// dashboardrouter.get('/profile',dashboardcontroller.getuserprofile);
dashboardrouter.get('/',dashboardcontroller.getuserprofile);


module.exports = dashboardrouter;