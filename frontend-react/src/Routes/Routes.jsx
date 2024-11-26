import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children:[
            {
                path: "/products",
                element: <h2>Orders Page</h2>,
            }
        ]
    },
    {
        path: "/dashboard",
        element: <Layout />,

    }
]);

export default router;