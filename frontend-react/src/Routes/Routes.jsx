import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
    },
    {
        path: "/dashboard",
        element: <Layout />,

    }
]);

export default router;