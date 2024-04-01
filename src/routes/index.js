import React from "react";
import { BrowserRouter } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./Context"; 

const RouteApp = () => {
  return (

    <BrowserRouter>
      <AuthProvider>
        <PublicRoute />
        <PrivateRoute />
      </AuthProvider>
    </BrowserRouter>

  );
};

export default RouteApp;
