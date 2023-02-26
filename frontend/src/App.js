import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home"
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Multistep from './components/forms/multistep';
import Nav from './components/Navbar/Navbar1';
import Footer from './components/Footer_page/Footer';
import WebTeam from './pages/WebTeam';
import Dashboard from './pages/Dashboard/Dashboard';
import ViewForm from './pages/ViewForm';

function App() {
  
  return (

    <>
     <Nav/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/auth/login" element={<Login/>} />
      <Route path="/auth/register" element={<Register/>} />
      <Route path="/form" element={<Multistep/>}/>   
      <Route path="/webteam" element={<WebTeam/>}/>   
      <Route path="/dashboard" element={<Dashboard/>}/>   
      <Route path="/viewform" element={<ViewForm/>}/> 
     </Routes>
     <Footer/>
     </>
     
    
  );
}

export default App;