import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavItem from "./NavItem";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";

import { List, IconButton, Box, Paper } from "@mui/material";

const Navbar = (props) => {
    return (
        <Fragment>
            <Paper
                id="navbar"
                sx={{
                    display: "flex",
                    flexFlow: "column nowrap",
                    width: "20rem",
                    height: "100%",
                    boxShadow: "1px 0 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "rgb(255, 255, 255)",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        height: "4rem",
                        padding: "0 12px",
                    }}
                >
                    <IconButton>
                        <FontAwesomeIcon icon={faBars} />
                    </IconButton>
                </Box>
                <List>
                    <NavItem icon={faSun} title="我的一天" isActive />
                </List>
            </Paper>
        </Fragment>
    );
};

export default Navbar;
