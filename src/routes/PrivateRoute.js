import React from 'react'
import { Routes, Route } from "react-router-dom";
import Statistics from "../protectedpages/Statistics"
import Addorder from '../protectedpages/Addorder';
import Createuser from '../protectedpages/Createuser';
import Orders from '../protectedpages/Orders';
import Header from "../protectedpages/header";
import { useAuth } from "../routes/Context";
import Error from '../publicpages/Error';
export default function PrivateRoute() {
    const { isValidToken } = useAuth();
    return (
        <div>
            {
                isValidToken() && <div>

                    <Header />
                    <Routes>
                        <Route path="/home" element={<Statistics />} />
                        <Route path="/add-order" element={<Addorder />} />
                        <Route path="/create-user" element={<Createuser />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </div>

            }


        </div>
    )
}
