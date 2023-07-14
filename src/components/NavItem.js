import { Fragment } from "react";

import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavItem = (props) => {
    const {
        icon,
        title,
    } = props;

    return (
        <Fragment>
            <ListItem sx={{
                padding: '0 8px',
            }}>
                <ListItemButton sx={{
                    height: '3rem',
                    padding: 0
                }}>
                    <ListItemIcon sx={{
                        minWidth: 0,
                        padding: '0 16px'
                    }}>
                        <FontAwesomeIcon icon={icon} size="xl" />
                    </ListItemIcon>

                    <ListItemText primary={title} sx={{flex: 1}} />
                </ListItemButton>
            </ListItem>
        </Fragment>
    );
};

export default NavItem;