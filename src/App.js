import { Fragment } from "react";
import router from "./router";
import GlobalStyle from "./GlobalStyle";
import { RouterProvider } from "react-router-dom";


function App() {
    return (
        <Fragment>
            <GlobalStyle />
            <RouterProvider router={router} />
        </Fragment>
    );
}

export default App;
