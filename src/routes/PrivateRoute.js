import React from 'react'
import { Routes, Route } from "react-router-dom";
import Statistics from "../protectedpages/Statistics"
import Addorder from '../protectedpages/Addorder';
import Createuser from '../protectedpages/Createuser';
import Orders from '../protectedpages/Orders';
import Header from "../protectedpages/header";
import Error from '../protectedpages/Error';
import Edituser from '../protectedpages/Edituser';
import { useAuth } from "../routes/Context";
import Portfolio from '../protectedpages/Portfolio';
export default function PrivateRoute() {
    const { isValidToken } = useAuth();
    return (
        <div>
            <div>
                {
                    isValidToken() && <Header />
                }
                <Routes>
                    <Route path="/home" element={<Statistics />} />
                    <Route path="/add-order" element={<Addorder />} />
                    <Route path="/create-user" element={<Createuser />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/edit-user" element={<Edituser />} />
                    <Route path="/artist/:artistId" element={<Portfolio />} />
                    {
                        isValidToken() && <Route path="*" element={<Error />} />
                    }
                </Routes>
            </div>


        </div>
    )
}
