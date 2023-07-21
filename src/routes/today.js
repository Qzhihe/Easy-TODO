import styled from "styled-components";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Box, Card, Typography } from "@mui/material";

import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TodoItem from "../components/TodoItem";
import dtd from "../utils/dtd";

const TodayPage = (props) => {
    const [inputValue, setInputValue] = useState("");
    const [nightTheme, setChangeTheme] = useState(false);
    
    // 主题切换-目前还咩有实现，只是图标改变
    function changeTheme() {
        setChangeTheme(!nightTheme);
    }
    let themeIcon = nightTheme ? faMoon : faSun;

    const today = dtd.formatDate();
    const dayOfWeek = dtd.day();

    function handleInputEnter(ev) {
        if (ev.key === "Enter") {
            // 发送请求，添加新日程
            console.log(inputValue);
            setInputValue("");
        }
    }

    return (
        <Fragment>
            <Card
                id="info"
                sx={{
                    display: "flex",
                    flexFlow: "column nowrap",
                    mb: "24px",
                    padding: "8px",
                    boxShadow: "none",
                    backgroundColor: "rgb(245, 245, 245)",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexFlow: "row nowrap",
                        alignItems: "center",
                    }}
                >
                    <FontAwesomeIcon
                        icon={themeIcon}
                        size="xl"
                        onClick={changeTheme}
                    />
                    <Typography
                        sx={{
                            ml: "8px",
                            fontSize: "1.5rem",
                            fontFamily: "PingFangSC",
                            fontWeight: "800",
                            userSelect: "none",
                        }}
                    >
                        我的一天
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        mt: "4px",
                        fontSize: "0.9rem",
                        fontWeight: "100",
                        userSelect: "none",
                    }}
                >
                    {today}&nbsp;&nbsp;{dayOfWeek}
                </Typography>
            </Card>

            <Card
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "3.5rem",
                    padding: "0 24px",
                    margin: "20px 0",
                }}
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    size="lg"
                    style={{ color: "rgb(255, 128, 0)" }}
                />
                <Input
                    value={inputValue}
                    onChange={(ev) => setInputValue(ev.target.value)}
                    onKeyDown={handleInputEnter}
                    placeholder="添加任务"
                />
            </Card>
            <Box>
                <TodoItem />
            </Box>
        </Fragment>
    );
};

export default TodayPage;

const Input = styled.input`
    width: 100%;

    margin-left: 16px;

    border: none;
    outline: none;

    font-size: 1rem;

    ::placeholder {
        color: rgb(255, 128, 0);
    }

    :focus::placeholder {
        color: rgb(0, 0, 0);
    }
`;
