import { Fragment } from "react";

import Topbar from "./Topbar";
import Navbar from "./Navbar/Navbar";
import { Box, Paper } from "@mui/material";

const Layout = (props) => {
    const { children } = props;

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
                <Box sx={{ padding: "1rem 2rem" }}>{children}</Box>
            </Paper>
        </Fragment>
    );
};

export default Layout;
