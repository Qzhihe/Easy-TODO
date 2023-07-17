import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavItem from "./NavItem";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";

import { List, IconButton, Box, Toolbar } from "@mui/material";

const Navbar = (props) => {
    const [seleced, setSelected] = useState(0);

    const navItems = [
        { icon: faSun, title: "我的一天" },
        { icon: null, title: "示例" },
    ];

    function handleNavItemClick(index) {
        setSelected(index);
    }

    return (
        <Fragment>
            <Toolbar
                id="navbar"
                disableGutters={true}
                sx={{   
                    display: "flex",
                    flexFlow: "column nowrap",
                    width: "18rem",
                    height: "100%",
                    boxShadow: "1px 0 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "rgb(255, 255, 255)",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        width: "100%",
                        height: "4rem",
                        padding: "0 12px",
                    }}
                >
                    {false && (
                        <IconButton>
                            <FontAwesomeIcon icon={faBars} />
                        </IconButton>
                    )}
                </Box>
                <List sx={{ width: "100%" }}>
                    {navItems.map((item, idx) => (
                        <Fragment key={idx}>
                            <NavItem
                                id={idx}
                                icon={item.icon}
                                title={item.title}
                                isActive={seleced === idx}
                                onClick={handleNavItemClick}
                            />
                        </Fragment>
                    ))}
                </List>
            </Toolbar>
        </Fragment>
    );
};

export default Navbar;
