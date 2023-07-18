import styled from "styled-components";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Box, Card, Typography } from "@mui/material";

import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const TodayPage = (props) => {
    const [inputValue, setInputValue] = useState("");

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
                    <FontAwesomeIcon icon={faSun} size="xl" />
                    <Typography
                        sx={{
                            ml: "8px",
                            fontSize: "1.5rem",
                            fontFamily: "PingFangSC",
                            fontWeight: "800",
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
                    }}
                >
                    七月 10日 星期一
                </Typography>
            </Card>

            <Card
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "3.5rem",
                    padding: "0 24px",
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
