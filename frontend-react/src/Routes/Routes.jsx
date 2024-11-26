import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Products from "../Pages/Products/Products";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import AdminHome from "../Pages/Admin-Home/AdminHome";
import ManageUsers from "../Pages/Manage-Users/ManageUsers";
import AdminRoute from "./AdminRoute";
import AddProducts from "../Pages/Add-Products/AddProducts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <PrivateRoutes><Home /></PrivateRoutes>,
            },
            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            }
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "admin-home",
                element: <AdminRoute><AdminHome /></AdminRoute>
            },
            {
                path: "manage-users",
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
            {
                path: "add-product",
                element: <AdminRoute><AddProducts /></AdminRoute>
            }
        ]

    }
]);

export default router;