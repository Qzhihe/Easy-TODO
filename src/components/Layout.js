import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import Topbar from "./Topbar";
import Navbar from "./Navbar";
import { Paper } from "@mui/material";

const Layout = (props) => {
    return (
        <Fragment>
            <Paper
                sx={{
                    display: "grid",
                    gridTemplate: "max-content 1fr / max-content 1fr ",
                    width: "100%",
                    height: "100%",
                    boxShadow: "none",
                    backgroundColor: "rgb(245, 245, 245)",
                }}
            >
                <Topbar />
                <Navbar />

                <Outlet />
            </Paper>
        </Fragment>
    );
};

export default Layout;
