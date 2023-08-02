import { Fragment, useEffect } from "react";
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
                <RouterProvider router={router} />
            </StoreProvider>
        </Fragment>
    );
}

export default App;
