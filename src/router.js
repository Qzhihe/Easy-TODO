import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

import TodayPage from "./routes/today";
import WelcomePage from "./routes/welcome";

import Layout from "./components/Layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <WelcomePage />,
    },
    {
        path: "/today",
        element: (
            <Layout>
                <TodayPage />
            </Layout>
        ),
    },
]);

export default router;
