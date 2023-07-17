import { RouterProvider } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";

import router from "./router";
import { Fragment } from "react";

function App() {
    return (
        <Fragment>
            <GlobalStyle />
            <RouterProvider router={router} />
        </Fragment>
    );
}

export default App;
