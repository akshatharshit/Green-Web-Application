import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import PlantInfo from './components/PlantInfo/PlantInfo';
import DetailPlant from './components/PlantInfo/DetailPlant';
import SearchCard from './components/PlantInfo/SearchCard';
import News from './components/Newsplant/News';
import CarePlant from './components/Care/CarePlant';
import AI from './components/AI/AI';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import CreateItem from './components/itemcreate/CreateItem';
import ItemList from './components/ListingArea/ItemList';
import Cart from './components/ListingArea/Cart';
import CreateBolg from './components/Blog/CreateBolg';
import Blog from './components/Blog/Blog';
import TreeSubmissionForm from './components/Reward/TreeSubmissionForm';
import Comleader from './components/Reward/Comleader';
import MainLayout from './components/Layout/MainLayout'
import { ToastContainer } from 'react-toastify';
import AddTestimonialForm from './components/UI/AddTestimonialForm'
import About from './components/UI/About';
import Contact from './components/UI/Contact';
import UpiForm from './components/upi/UpiForm';
import UpiList from './components/upi/UpiList'
import WeatherTemp from './components/weatherTemp/WeatherTemp';


function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Plant-info' element={<PlantInfo />} />
          <Route path='/Plant-info/:id' element={<DetailPlant />} />
          <Route path='/Plant-info/Search' element={<SearchCard />} />
          <Route path='/news' element={<News />} />
          <Route path='/care' element={<CarePlant />} />
          <Route path='/ai' element={<AI />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/item/create' element={<CreateItem />} />
          <Route path='/item/listings' element={<ItemList />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/blog/create' element={<CreateBolg />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/submission/upload' element={<TreeSubmissionForm />} />
          <Route path='/leaderboard' element={<Comleader />} />
          <Route path='/testimonial' element={<AddTestimonialForm />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/upiId' element={<UpiForm />} />
          <Route path='/upiId/edit' element={<UpiList/>} />
          <Route path='/weather' element={<WeatherTemp/>} />
          
        </Routes>
      </MainLayout>
      <ToastContainer/>
    </Router>
  );
}

export default App;
