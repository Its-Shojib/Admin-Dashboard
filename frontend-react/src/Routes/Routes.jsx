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
import ManageProducts from "../Pages/Manage-Products/ManageProducts";
import UpdateProduct from "../Pages/Update-Products/UpdateProduct";

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
                element: <PrivateRoutes><Products /></PrivateRoutes>,
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
            },
            {
                path: "manage-products",
                element: <AdminRoute><ManageProducts /></AdminRoute>
            },
            {
                path: "update-product/:id",
                element: <AdminRoute><UpdateProduct /></AdminRoute>,
                loader: ({ params }) => fetch(`http://127.0.0.1:8000/api/product/${params.id}`)
            }
        ]

    }
]);

export default router;