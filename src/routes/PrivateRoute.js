import React from 'react'
import { Routes, Route } from "react-router-dom";
import Statistics from "../protectedpages/Statistics"
import Addorder from '../protectedpages/Addorder';
import Createuser from '../protectedpages/Createuser';
import Orders from '../protectedpages/Orders';
export default function PrivateRoute() {
    return (
        <div>
            <Routes>
                <Route path="/Statistics" element={<Statistics />} />
                <Route path="/add-order" element={<Addorder />} />
                <Route path="/create-user" element={<Createuser/>} />
                <Route path="/orders" element={<Orders />} />
            </Routes>

        </div>
    )
}
