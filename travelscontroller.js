const travels = require("../models/TravelsSchema");
const booking = require("../models/BookingSchema");
const stripe = require('stripe')('sk_test_51RFKz9S0vK0vK0vK0vK0vK0vK0vK0vK0vK0vK' ); // Replace with your Stripe secret key from dashboard.stripe.com/test/apikeys
//addjobs
exports.travelsadd = async(req,res)=>{
    try{
        let { Place_name, Description, Price, Location, Category, Created_at, imageurl} =req.body;

        const travels_data = await travels.create({ Place_name, Description, Price, Location, Category, Created_at, imageurl});
        //  {  <ul>
        
        // {travels_data.map((travel)=>{
        //     return(
        //     <li key={travel}>
        //         <div>
        //             <h2>Image</h2>
        //             <h3>Place_name:travel.Place_name</h3>
        //             <h3>Description:travel.Description</h3>
        //             <h3>Location:travel.Location</h3>
        //             <h3>Price:travel.Price</h3>
        //             <h3>Category:travel.Category</h3>
        //             <h3>Created_at:travel.Created_at</h3> 
                    
        //             <a href={"/travels/booking"}><button type="submit">Book now</button></a>
        //         </div>
        //     </li>
        // )})}
        // </ul>
        return res.status(200).json(travels_data);
    }
    catch(err){
        return res.status(500).json(err);
    }
};

//updatejobs
exports.travelsupdate = async(req,res)=>{
    try{
        let { Place_name, Description, Price, Location, Category, Created_at, imageurl} =req.body;
        const travels_data = await travels.findOneAndUpdate( { Place_name, Description, Price, Location, Category, Created_at, imageurl});
        return res.status(200).json(travels_data);
    }
    catch(err){
        return res.status(500).json(err);
    }
};

//deletejobs
exports.travelsdelete = async(req,res)=>{
    try{
        
        const travels_data = await travels.deleteOne( { Place_name, Description, Price, Location, Category, Created_at, imageurl});
        return res.status(200).json(travels_data);
    }
    catch(err){
        return res.status(500).json(err);
    }
};
//get all travels
exports.GetAllTravels = async(req,res)=>{
    try{
        const travels_data = await travels.find({});

        return res.status(200).json(travels_data);
    }
    catch(err){
        return res.status(400).json(err);
    }
};

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, metadata } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'inr',
      metadata: metadata || {},
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



//gettravelsby id
exports.gettravelsbyId= async(req,res)=>{
    try{
        const travels_data = await travels.findById({});
        return res.status(200).json(travels_data);
    }
    catch(err){
        return res.status(400).json(err);
    }
};

//gettravelsbyname
exports.gettravelsbyName= async(req,res)=>{
    try{
        const travels_data = await travels.find({Place_name:req.params.name});
        
        return res.status(200).json(travels_data);
    }
    catch(err){
        return res.status(400).json(err);
    }
};

//booking
exports.createbooking= async(req,res)=>{
    // const travels_Data={"username":"Pratibha", "Placename":"Kushinagar", "contact":"9399051443", "Pickup_location":"Satna,Madhya Pradesh", "Pick_up_date_and_Time":"06-04-2026 10:17", "Drop_location":"kushinagar,Nagpur,India", "Payment_amount":"6000rs","email":"pratibha122005@gmail.com", "Drop_date":"06-04-2026", "password":"01022005", "car":"ertiga"};
    // const {Placename}="varanasi";
    // const booking = async ()=>{
    //             const userbooked = await booking.create(travels_Data);
    //             return req.status(200).json(userbooked);
    //         }
    try{
        const {username, Placename, email, password, contact, Pickup_location, Pickup_date_and_Time, Drop_date, car, Payment_amount, Drop_location, payment_intent, metadata } = req.body;
        const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
        if (paymentIntent.status !== 'succeeded') {
          return res.status(400).json({ error: 'Payment not successful' });
        }
        const booking_data = await booking.create({username, Placename, email, password, contact, Pickup_location, Pickup_date_and_Time, Drop_date, car, Payment_amount, Drop_location, stripe_payment_intent_id: payment_intent, payment_status: 'paid', type_of_booking: metadata?.type || 'tour'});
                  
        
        return res.status(200).json(booking_data);
    }
    catch(err){
        return res.status(400).json(err);
    }
};
// exports.createbooking= async(req,res)=>{

//     try{
//         let {name, password, contact, Pick_up_date_and_time, Pick_up_location, Drop_location, car, Drop_date, Payment_amount} = req.body;
//         const booking_data = await booking.create({name, password, contact, Pick_up_date_and_time, Pick_up_location, Drop_location, Drop_date, car, Payment_amount});
//         return req.status(200).json(booking_data);
//     }
//     catch(err){
//         return res.status(500).json(err);
//     }
// };