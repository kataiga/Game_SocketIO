import React from "react";

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Homepage from "../Pages/Homepage/Homepage"
import Login from "../Pages/Login/Login"
import Register from "../Pages/Register/Register"
import Profile from "../Pages/Profile/Profile"
import Dashboard from "../Pages/Dashboard/Dashboard"
import VerifyEmail from "../Pages/ForgotPassword/VerifyEmail"
import NewPassword from "../Pages/ForgotPassword/NewPassword"
import NotFound from "../Pages/NotFound/NotFound"
import Game from "../Pages/Game/Game"
export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/verify_email" element={<VerifyEmail/>}/>
                <Route path="/new_password" element={<NewPassword/>}/>
                <Route path="/game" element={<Game/>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}