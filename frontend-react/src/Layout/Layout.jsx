import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const Layout = () => {
    return (
        <div className="w-full px-2 md:px-0 mx-auto relative">
            <Navbar />
            <div className="min-h-[calc(100vh-154px)]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;