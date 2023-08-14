import "./index.css";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import TodayPage from "./routes/today";
import NotFound from "./routes/404/404";
import { getUserInfo } from "./api/app";
import GlobalStyle from "./GlobalStyle";
import { getTodoList } from "./api/todo";
import Layout from "./components/Layout";
import SignInPage from "./routes/signin";
import SignUpPage from "./routes/signup";
import WelcomePage from "./routes/welcome";
import "react-toastify/dist/ReactToastify.css";
import FourQuadrant from "./routes/FourQuadrant";
import { ToastContainer, toast } from "react-toastify";
import { Fragment, useEffect, useContext } from "react";
import StoreProvider, { StoreContext } from "./store/store";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function isValidToken() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        return false;
    }

    return true;
}

const PublicRoute = ({ element }) => {
    return isValidToken() ? <Navigate to="/views" /> : element;
};

const PrivateRoute = ({ element }) => {
    const { store, setStore } = useContext(StoreContext);

    useEffect(() => {
        (async () => {
            try {
                const result = await getTodoList();

                result.sort((a, b) => b.id - a.id);
                setStore((prev) => ({ ...prev, todoList: result }));
            } catch (err) {
                console.error(err);
            }
        })();

        (async () => {
            try {
                const result = await getUserInfo();
                if (result.code === 20000) {
                    console.log(result.data);
                    let updateUser = {
                        id: result.data.id,
                        avatar: result.data.avatar,
                        name: result.data.name,
                    };
                    setStore((prev) => ({ ...prev, user: updateUser }));
                } else {
                    throw new Error("用户信息拿取失败！");
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, [setStore]);

    useEffect(() => {
        let timer = null;
        const { todoList } = store;
        if (todoList.length > 0) {
            timer = setInterval(() => {
                const curTime = dayjs().locale("zh-cn");
                todoList
                    .filter((todo) => !todo.isDone && todo.alarm)
                    .forEach((todo) => {
                        const { alarm } = todo,
                            delta = curTime.diff(alarm, "second", true);

                        if (delta >= 0 && delta < 10) {
                            notify(todo);
                        }
                    });
            }, 10 * 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [store]);

    function notify(todo) {
        toast(`${todo.title}`, {
            theme: "light",
            draggable: true,
            autoClose: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            position: "top-right",
            hideProgressBar: false,
        });
    }

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
                            <Route
                                path="four-quadrant"
                                element={<FourQuadrant />}
                            />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
                <ToastContainer />
            </StoreProvider>
        </Fragment>
    );
}

export default App;
