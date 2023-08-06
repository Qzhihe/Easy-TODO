import "dayjs/locale/zh-cn";
import { Fragment } from "react";
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import StoreProvider from "./store/store";

import Layout from "./components/Layout";
import SignInPage from "./routes/signin";
import SignUpPage from "./routes/signup";
import WelcomePage from "./routes/welcome";
import NotFound from "./routes/404/404";
import TodayPage from "./routes/today";

function isValidToken() {
    // const token = localStorage.getItem("authToken");

    // if (!token) {
    //     return false;
    // }

    return true;
}

const PublicRoute = ({ element }) => {
    return isValidToken() ? <Navigate to="/views" /> : element;
};

const PrivateRoute = ({ element }) => {
    return isValidToken() ? element : <Navigate to="/" />;
};

function App() {
    return (
        <Fragment>
            <StoreProvider>
                <GlobalStyle />

                <BrowserRouter>
                    <Routes>
                        {/* 待优化，代码重复 */}
                        <Route
                            path="/"
                            element={<PublicRoute element={<WelcomePage />} />}
                        />
                        <Route
                            path="/signin"
                            element={<PublicRoute element={<SignInPage />} />}
                        />
                        <Route
                            path="/signup"
                            element={<PublicRoute element={<SignUpPage />} />}
                        />

                        <Route
                            path="/views"
                            element={<PrivateRoute element={<Layout />} />}
                        >
                            <Route index element={<Navigate to="today" />} />
                            <Route path="today" element={<TodayPage />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </StoreProvider>
        </Fragment>
    );
}

export default App;
