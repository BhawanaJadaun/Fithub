import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';  
import Footer from "./components/Footer.jsx";
import AppRoutes from './AppRoutes.jsx'; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
      <Footer/>
      <ToastContainer theme="colored" autoClose={3000} />

    </Router>
  );
}

export default App;
