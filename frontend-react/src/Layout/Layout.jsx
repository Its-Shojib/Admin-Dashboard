import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const Layout = () => {
    return (
        <div className="w-full px-2 mx-auto">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;