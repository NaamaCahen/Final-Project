import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Home from './components/Home';
import Welcome from './components/Welcome';
import Auth from './authentication/Auth';
import Search from './components/Search';
import Profile from './components/Profile';
import MyBooks from './components/MyBooks';
import logo1 from './logo/logo.png'


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Welcome/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/myBooks' element={<MyBooks/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
        
      </BrowserRouter>
      {/* <div>
        <img src={logo1}/>
      </div> */}
    </>
  );
}

export default App;
