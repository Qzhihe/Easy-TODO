import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

import TodayPage from "./routes/today";
import WelcomePage from "./routes/welcome";
import Layout from "./components/Layout";
import SignInPage from "./routes/signin";
import SignUpPage from "./routes/signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <WelcomePage />,
    },
    {
        path: "/signin",
        element: <SignInPage />,
    },
    {
        path: "/signup",
        element: <SignUpPage />,
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
