import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AddUser from "./pages/AddUser";
import Dashboard from "./pages/Dashboard";
import ViewAudit from "./pages/ViewAudit";
import ManagePermission from "./pages/ManagePermission";
import './App.css';
import { Route, Routes } from "react-router-dom";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/Adduser" element={<AddUser/>}/>
         <Route path="/Dashboard" element={<Dashboard/>}/>
         <Route path="/Login" element={<Login/>}/>
         <Route path="/Signup" element={<SignUp/>}/>
         <Route path="/Managepermission" element={<ManagePermission/>}/>
         <Route path="/Viewaudit" element={<ViewAudit/>}/>
         <Route path="/Edituser/:id" element={<EditUser/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
