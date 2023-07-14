import { Fragment } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    ListItemIcon,
    ListItemText,
    ListItemButton,
    ListItem as MUIListItem,
} from "@mui/material";

const NavItem = (props) => {
    const { icon, title, isActive } = props;

    return (
        <Fragment>
            <ListItem sx={{ margin: 0, padding: 0, isActive }}>
                <ListItemButton sx={{ height: "3rem" }}>
                    <ListItemIcon sx={{ minWidth: 0 }}>
                        <FontAwesomeIcon icon={icon} size="xl" />
                    </ListItemIcon>
                    <ListItemText
                        primary={title}
                        primaryTypographyProps={{ fontWeight: 600 }}
                        sx={{ margin: "0 8px" }}
                    />
                    <ListItemText
                        primary={0}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                    />
                </ListItemButton>
            </ListItem>
        </Fragment>
    );
};

export default NavItem;

const ListItem = styled(MUIListItem)`
    border-left: ${(props) =>
        props.sx.isActive ? `4px solid rgb(255, 128, 0)` : `none`};
    background-color: ${(props) =>
        props.sx.isActive ? `rgb(255, 245, 235)` : `rgb(255, 255, 255)`};
`;
