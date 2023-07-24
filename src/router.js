import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

// import TodayPage from "./routes/today";
// import WelcomePage from "./routes/welcome";
// import Layout from "./components/Layout";
// import SignInPage from "./routes/signin";
// import SignUpPage from "./routes/signup";

const TodayPage = React.lazy(() => import("./routes/today"));
const WelcomePage = React.lazy(() => import("./routes/welcome"));
const Layout = React.lazy(() => import("./components/Layout"));
const SignInPage = React.lazy(() => import("./routes/signin"));
const SignUpPage = React.lazy(() => import("./routes/signup"));

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
        path: "/views",
        element: <Layout />,
        children: [
            {
                path: "today",
                element: <TodayPage />,
            },
        ],
    },
]);

export default router;
