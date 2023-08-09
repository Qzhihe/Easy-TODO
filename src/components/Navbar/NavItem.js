import styled from "styled-components";
import { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ListItemText, ListItemButton } from "@mui/material";

import { StoreContext } from "../../store/store";

const NavItem = (props) => {
    const { id, icon, title, isActive, to, handleNavItemClick } = props;

    const navigate = useNavigate();
    const { store } = useContext(StoreContext);

    const { todoList } = store;
    const len = todoList.filter((item) => !item.isDone).length;

    function handleClick(id) {
        navigate(to);
        handleNavItemClick?.(id);
    }

    return (
        <Fragment>
            <ListItem isActive={isActive}>
                <ListItemButton sx={{ height: "3rem" }} onClick={() => handleClick(id)}>
                    {icon && (
                        <div style={{ minWidth: 0, marginRight: "0.5rem" }}>
                            <FontAwesomeIcon icon={icon} size="xl" />
                        </div>
                    )}
                    <ListItemText
                        primary={title}
                        primaryTypographyProps={{ fontWeight: 600 }}
                        sx={{ pointerEvents: "none" }}
                    />
                </ListItemButton>
            </ListItem>
        </Fragment>
    );
};

export default NavItem;

const ListItem = styled.li`
    border-left: ${(props) =>
        props.isActive ? `4px solid rgb(255, 128, 0)` : `none`};
    background-color: ${(props) =>
        props.isActive ? `rgb(255, 245, 235)` : `rgb(255, 255, 255)`};
`;
