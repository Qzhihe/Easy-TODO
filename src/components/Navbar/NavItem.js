import { Fragment, useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    ListItemIcon,
    ListItemText,
    ListItemButton,
    ListItem as MUIListItem,
} from "@mui/material";
import { StoreContext } from "../../store/store";

const NavItem = (props) => {
    const { id, icon, title, isActive, onClick } = props;
    const { store, setStore } = useContext(StoreContext);
    const { todoList } = store;

    const len = todoList.filter(item => item.state === '0').length;


    function innerClickHandler(id) {
        onClick(id);
    }

    return (
        <Fragment>
            <ListItem
                sx={{ margin: 0, padding: 0, isActive }}
                onClick={() => innerClickHandler(id)}
            >
                <ListItemButton sx={{ height: "3rem" }}>
                    {icon && (
                        <ListItemIcon sx={{ minWidth: 0, mr: "8px" }}>
                            <FontAwesomeIcon icon={icon} size="xl" />
                        </ListItemIcon>
                    )}
                    <ListItemText
                        primary={title}
                        primaryTypographyProps={{ fontWeight: 600 }}
                    />
                    <ListItemText
                        primary={len}
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
