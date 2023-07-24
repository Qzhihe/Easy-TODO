import { Fragment, useEffect, Suspense } from "react";
import GlobalStyle from "./GlobalStyle";
import { RouterProvider } from "react-router-dom";

import router from "./router";

import StoreProvider from "./store/store";

function App() {
    useEffect(() => {
        console.log("!!!!!!");
    });
    return (
        <Fragment>
            <StoreProvider>
                <GlobalStyle />
                <Suspense>
                    {/* 牛波一，那个页面加载中效果就是这么出来的 → fallback={<div>Loading...</div>} */}
                    <RouterProvider router={router} />
                </Suspense>
            </StoreProvider>
        </Fragment>
    );
}

export default App;
