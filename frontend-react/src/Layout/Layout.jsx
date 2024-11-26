import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";


const Layout = () => {
    return (
        <div className="w-full px-2 mx-auto">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Layout;