import { Fragment } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AppBar as MuiAppBar } from "@mui/material";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Topbar = (props) => {
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
                    <input type="text" />
                </div>
                <div id="avatar"></div>
            </AppBar>
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
