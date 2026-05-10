
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import GetAllTravels from './components/GetAllTravels';
import Travels_add from './components/Travels_add';
// import Profile from './components/Profile';
import Home from './components/Home';
import About from './components/About';

import Cars_add, { GetAllCars, Cars_update } from './components/Cars_add';
import Login from './components/Login';
import Mybookings from './components/Mybookings';
import Booking from './components/Booking';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  
  return (
    <div>
      <Navbar />
      <Routes>
        {/* dashboard routes */}
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/carsadd" element={<Cars_add/>} />
<Route path="/carsupdate" element={<Cars_update/>} />
        <Route path="/dashboard/getallcars" element={<GetAllCars/>} />
        <Route path="/dashboard/GetAllCars" element={<GetAllCars/>} />
        <Route path="/dashboard/Mybookings" element={<Mybookings/>} />
        <Route path="/admindashboard" element={<AdminDashboard/>} />
        {/* travels routes */}
<Route path="/booking/:type/:id" element={<Booking/>} />
        <Route path="/travels/GetAllTravels" element={<GetAllTravels/>} />
        <Route path="/travelsadd" element={<Travels_add/>} /> 
        <Route path="/travelsupdate" element={<h1>Coming Soon</h1>} /> 
        {/* auth routes */}
        <Route path="/auth/register" element={<Register/>} />
        <Route path="/auth/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        
          {/* <Route path="/profile" element={<Profile/>} /> */}
        
        
      </Routes>
    </div>
  )
}

export default App


