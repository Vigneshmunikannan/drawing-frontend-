import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../publicpages/Home";
import Error from "../protectedpages/Error"
import Admin from "../publicpages/Admin";
import Works from "../publicpages/Works";
import Otherservices from "../publicpages/Otherservices";
import Team from "../publicpages/Team";
import Aboutus from "../publicpages/Aboutus";
import Terms from "../publicpages/Terms";
import Privacypolicy from "../publicpages/Privacypolicy";
import Header from "../publicpages/header";
import Footer from "../publicpages/Footer"
import { useAuth } from "../routes/Context";
const PublicRoute = () => {
    const location = useLocation();
    const { isValidToken } = useAuth();
    const shouldRenderComponent = location.pathname !== '/admin';
    return (
        <div>
            {
                !isValidToken() && shouldRenderComponent && <Header />
            }

            <Routes>
                <Route path="/" element={<Home />} />
                {
                    !isValidToken() && <Route path="*" element={<Error />} />
                }
                <Route path="/admin" element={<Admin />} />
                <Route path="/works" element={<Works />} />
                <Route path="/our-team" element={<Team />} />
                <Route path="/other-services " element={<Otherservices />} />
                <Route path="/about-Us" element={<Aboutus />} />
                <Route path="/t&S" element={<Terms />} />
                <Route path="/privacy-policy " element={<Privacypolicy />} />
            </Routes>
            {
                !isValidToken() && shouldRenderComponent && <Footer />
            }

        </div>
    );
};

export default PublicRoute;
