import styled from "styled-components";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Box, Card, Typography } from "@mui/material";

import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TodoItem from "../components/TodoItem";

const TodayPage = (props) => {
    const [inputValue, setInputValue] = useState("");

    const todoList = [
        // 暂拟定type123从重要到次要 0未完成1已完成
        { title: '回顾八股', startTime:'2023-07-17', type: '1',  msg: '随便一看吧', state: '0'},
        { title: '准备下午五点面试', startTime:'2023-07-17', type: '2',  msg: '555', state: '0'},
        { title: '今晚吃啥？', startTime:'2023-07-17', type: '3',  msg: '好想嗦粉', state: '0'},
        { title: '刷算法题', startTime:'2023-07-17', type: '3',  msg: '二叉树+DFS，难死我了', state: '1'},
        { title: '做项目', startTime:'2023-07-17', type: '1',  msg: '全部改成function格式，哭哭', state: '1'},
        { title: '买饭', startTime:'2023-07-17', type: '2',  msg: '今天中午吃烤肉饭外卖咯！', state: '1'},
    ];

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
                <TodoItem
                    todoList={todoList}
                />
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
