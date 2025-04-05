import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard.jsx";
import AllGym from "./Pages/Product/AddGym.jsx";
import AddGym from "./Pages/Product/AddGym.jsx"
import EditGym from "./Pages/Product/EditGym.jsx";
import GymDetails from "./Pages/Product/EditGym.jsx";
import EnquiryPage from "./Pages/EnquiryPage.jsx";
import Analytics from "./Pages/AnalyticPage.jsx";
import Sidebar from "./components/Sidebar.jsx";
const App = () => {
  return (
    <Router>
      <Sidebar>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/gyms" element={<AllGym/>} />
        <Route path="/add-gym" element={<AddGym />} />
        <Route path="/edit-gym/:id" element={<EditGym />} />
        <Route path="/gym/:id" element={<GymDetails />} />
        <Route path="enquiry-page" element={<EnquiryPage />} />
        <Route path="analytics" element={<Analytics />} />
      </Routes>
      </Sidebar>
    </Router>
  )
}

export default App
