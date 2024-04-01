import { Routes, Route } from "react-router-dom";
import Home from "../publicpages/Home";
import Error from "../publicpages/Error";
import Admin from "../publicpages/Admin";
import Works from "../publicpages/Works";
import Otherservices from "../publicpages/Otherservices";
import Team from "../publicpages/Team";
import Aboutus from "../publicpages/Aboutus";
import Terms from "../publicpages/Terms";
import Privacypolicy from "../publicpages/Privacypolicy";

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
