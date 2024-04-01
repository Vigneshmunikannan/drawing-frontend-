import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import Error from "../pages/Error";
import Admin from "../pages/Admin";
import Works from "../pages/Works";
import Otherservices from "../pages/Otherservices";
import Team from "../pages/Team";
import Aboutus from "../pages/Aboutus";
import Terms from "../pages/Terms";
import Privacypolicy from "../pages/Privacypolicy";

const PublicRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Error />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Works" element={<Works />} />
            <Route path="/Our-team" element={<Team />} />
            <Route path="/Other-services " element={<Otherservices />} />
            <Route path="/About-Us" element={<Aboutus />} />
            <Route path="/T&S" element={<Terms />} />
            <Route path="/privacy-policy " element={<Privacypolicy />} />
        </Routes>
    );
};

export default PublicRoute;
