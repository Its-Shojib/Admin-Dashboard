import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const Layout = () => {
    return (
        <div className="w-full px-2 md:px-0 mx-auto">
            <Navbar />
            <Outlet />
            <div className="absolute bottom-0 w-full"><Footer /></div>
        </div>
    );
};

export default Layout;