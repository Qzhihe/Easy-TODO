import { Fragment, useContext, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    AppBar as MuiAppBar,
    Dialog,
    DialogContent,
    DialogTitle,
    Input,
    List,
    ListItem,
    ListItemButton,
    Menu,
    Typography,
} from "@mui/material";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { StoreContext } from "../store/store";
import { doLogout } from "../api/app";
import { Box } from "@mui/system";

const Topbar = (props) => {
    const defaultSearch = [{ title: "搜索结果", id: "0" }];
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [searchList, setSearchList] = useState(defaultSearch);
    const [logoutOpen, setLogoutOpen] = useState(null);

    const { store, setStore } = useContext(StoreContext);
    const todoList = store.todoList;
    const user = store.user;

    function handleInputClick() {
        setSearch("");
        setOpen(true);
    }

    function handleChange(event) {
        let data = event.target.value;
        setSearch(data);
    }

    function handleEnter(event) {
        if (event.key === "Enter" && search !== "") {
            console.log(todoList);

            setSearchList(
                todoList.filter(
                    (item) =>
                        item.title.includes(search) ||
                        item.description.includes(search)
                )
            );
        } else if (event.key === "Enter" && search === "") {
            setSearchList(defaultSearch);
        }
    }

    function handleAvatarClick(event) {
        event.preventDefault();
        setLogoutOpen(event.target);
    }

    async function userLogOut() {
        try {
            const result = await doLogout();
            if (result.code === 20000) {
                localStorage.removeItem("authToken");
                localStorage.removeItem("id");
                setStore({
                    user: {
                        id: "",
                        navatar: "",
                        name: "",
                    },
                    todoList: [],
                });
                setLogoutOpen(false);
                window.location.reload(); 
            } else {
                throw new Error("登出失败");
            }
        } catch (err) {
            console.error(err);
            setLogoutOpen(false);
        }
    }

    return (
        <Fragment>
            <AppBar
                position="relative"
                sx={{
                    gridColumn: "span 2",
                    display: "grid",
                    gridTemplate: "1fr / 1fr 2fr 1fr",
                    alignItems: "center",
                    width: "100%",
                    height: "3rem",
                    padding: "0 20px",
                    boxShadow: "none",
                    backgroundColor: "rgb(255, 128, 0)",
                }}
            >
                <h1 id="app-title">Easy TODO</h1>
                <div id="search-input">
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        rotation={90}
                        size="lg"
                        style={{ color: "rgb(255, 128, 0)" }}
                    />
                    <input type="text" onClick={handleInputClick} />
                </div>
                <Awa
                    avatar={user?.avatar}
                    onContextMenu={handleAvatarClick}
                ></Awa>
            </AppBar>

            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    <Input
                        placeholder="搜索关键字"
                        onChange={handleChange}
                        onKeyDown={handleEnter}
                        value={search}
                        sx={{ width: "100%" }}
                    />
                </DialogTitle>
                <DialogContent>
                    <List>
                        {searchList.map((item) => (
                            <ListItem key={item.id}>
                                <ListItemButton>
                                    {item.title}
                                    {item.description
                                        ? `—${item.description}`
                                        : ""}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>

            <Menu
                anchorEl={logoutOpen}
                open={!!logoutOpen}
                onClose={() => {
                    setLogoutOpen(false);
                }}
                MenuListProps={{
                    disablePadding: true,
                }}
                autoFocus={false}
            >
                <Box
                    onClick={userLogOut}
                    sx={{
                        cursor: "pointer",
                        display: "flex",
                        flexFlow: "row nowrap",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: ".5rem 1rem",
                    }}
                >
                    <Typography fontSize={".825rem"}>登出</Typography>
                </Box>
            </Menu>
        </Fragment>
    );
};

export default Topbar;

const AppBar = styled(MuiAppBar)`
    #app-title {
        font-size: 1.5rem;
        color: rgb(255, 255, 255);

        user-select: none;
    }

    #search-input {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        justify-self: center;

        width: 100%;
        max-width: 30rem;
        height: 2.5rem;

        margin: 0 12px;
        padding: 8px;

        border-radius: 4px;

        background-color: rgb(255, 255, 255);

        & input {
            width: 100%;
            height: 100%;

            margin: 0 8px;

            border: none;
            outline: none;

            font-size: 1rem;
            line-height: 1.5rem;
        }
    }

    #avatar {
        justify-self: end;

        width: 2.5rem;
        height: 2.5rem;

        border-radius: 50%;

        background-color: white;
    }
`;

const Awa = styled("div")`
    justify-self: end;

    width: 2.5rem;
    height: 2.5rem;

    border-radius: 50%;

    background-color: white;
    background-image: ${(props) => `url(${props?.avatar})`};
    background-size: cover;
    background-position: center;
`;
