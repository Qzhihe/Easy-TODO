import dayjs from "dayjs";
import styled from "styled-components";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useContext, useEffect, useState } from "react";

import {
    Box,
    Menu,
    Card,
    Divider,
    Typography,
    IconButton,
    Tooltip,
} from "@mui/material";

import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import {
    faPlus,
    faFlag,
    faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

import { faSun } from "@fortawesome/free-regular-svg-icons";

import { StoreContext } from "../store/store";
import TodoList from "../components/TodoList";
import { getPriorityProp } from "../utils/priority";
import { getCalendarDate } from "../utils/date";
import { sendRequest } from "../utils/request";

dayjs.extend(localizedFormat);

const defaultNextTodo = {
    title: "",
    date: null,
    alarm: null,
    isDone: false,
    priority: 0,
    category: null,
    description: "",
};

const TodayPage = (props) => {
    const { store, setStore } = useContext(StoreContext);

    // const [nightTheme, setChangeTheme] = useState(false);
    const [nextTodo, setNextTodo] = useState(defaultNextTodo);
    const [dateMenuAnchor, setDateMenuAnchor] = useState(null);
    const [priorityMenuAnchor, setPriorityMenuAnchor] = useState(null);

    // let themeIcon = nightTheme ? faMoon : faSun;
    const todoList = store.todoList;

    useEffect(() => {
        (async () => {
            try {
                const { data } = await sendRequest({
                    url: "/schedule/all",
                    method: "get",
                });

                const todoList = data.map(
                    ({ sTime, eTime, userId, scheId, ...others }) => {
                        return {
                            id: scheId,
                            date: dayjs(sTime).locale("zh-cn"),
                            ...others,
                        };
                    }
                );

                todoList.sort((a, b) => b.id - a.id);

                setStore((prev) => ({ ...prev, todoList }));
            } catch (err) {
                console.error(err);
            }
        })();
    }, [setStore]);

    // TODO: 主题更换
    // function changeTheme() {
    //     setChangeTheme(!nightTheme);
    // }

    async function addTodo(todo) {
        if (!todo) {
            return;
        }

        const { date, ...others } = todo;
        const payload = {
            ...others,
            sTime: date.toJSON(),
        };

        try {
            const { data: id } = await sendRequest({
                method: "post",
                url: "/schedule",
                data: payload,
            });

            const updatedList = [{ ...todo, id }, ...todoList];
            setStore((prev) => ({ ...prev, todoList: updatedList }));
        } catch (err) {
            console.log(err);
        }
    }

    function handleTitleChange(ev) {
        setNextTodo({ ...nextTodo, title: ev.target.value });
    }

    function handlePriorityChange(ev) {
        const priority = parseInt(ev.target.getAttribute("data-priority"));
        setNextTodo({ ...nextTodo, priority });
    }

    function handleCalendarChange(date, state) {
        if (state === "finish") {
            setDateMenuAnchor(null);
        }
        setNextTodo({ ...nextTodo, date });
    }

    function handleInputEnter(ev) {
        if (ev.key === "Enter" && nextTodo.title) {
            setNextTodo(defaultNextTodo);
            addTodo(nextTodo);
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
                    {dayjs().locale("zh-cn").format("YYYY 年 M 月 D 日 dddd")}
                </Typography>
            </Card>

            <Card
                sx={{
                    mt: "20px",
                    padding: "0 24px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "3.5rem",
                    }}
                >
                    <Box>
                        <FontAwesomeIcon
                            icon={faPlus}
                            size="lg"
                            style={{ color: "rgb(255, 128, 0)" }}
                        />
                    </Box>
                    <Input
                        name="title"
                        value={nextTodo.title}
                        onKeyDown={handleInputEnter}
                        onChange={handleTitleChange}
                        placeholder="添加任务"
                    />
                </Box>
                <Divider />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    <Box
                        component="ul"
                        sx={{ display: "flex", gap: "0 0.75rem" }}
                    >
                        <Box component="li" sx={{ display: "block" }}>
                            <Tooltip
                                title={
                                    getPriorityProp(
                                        nextTodo.priority,
                                        "title"
                                    ) ?? "设置优先级"
                                }
                            >
                                <IconButton
                                    onClick={(ev) =>
                                        setPriorityMenuAnchor(ev.target)
                                    }
                                >
                                    <FontAwesomeIcon
                                        size="2xs"
                                        icon={faFlag}
                                        color={getPriorityProp(
                                            nextTodo.priority,
                                            "color"
                                        )}
                                    />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box component="li" sx={{ display: "block" }}>
                            <Tooltip
                                title={
                                    getCalendarDate(nextTodo.date) ?? "设置时间"
                                }
                            >
                                <IconButton
                                    onClick={(ev) =>
                                        setDateMenuAnchor(ev.target)
                                    }
                                >
                                    <FontAwesomeIcon
                                        size="2xs"
                                        icon={faCalendarDays}
                                        color={
                                            nextTodo.date
                                                ? "rgb(255, 128, 0)"
                                                : "#a2a2a2"
                                        }
                                    />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Box>
            </Card>

            <TodoList />

            <Menu
                anchorEl={priorityMenuAnchor}
                open={!!priorityMenuAnchor}
                onClick={() => setPriorityMenuAnchor(null)}
                onClose={() => setPriorityMenuAnchor(null)}
                MenuListProps={{
                    disablePadding: true,
                    sx: {
                        padding: "1rem",
                    },
                }}
            >
                <Box component="li">
                    <Typography
                        paragraph
                        sx={{
                            fontSize: "0.8rem",
                            color: "rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        优先级
                    </Typography>
                    <Box
                        component="ul"
                        onClick={handlePriorityChange}
                        sx={{
                            display: "flex",
                            gap: "0 0.75rem",
                        }}
                    >
                        <PriorityRadio
                            priority={3}
                            active={nextTodo.priority === 3}
                        />
                        <PriorityRadio
                            priority={2}
                            active={nextTodo.priority === 2}
                        />
                        <PriorityRadio
                            priority={1}
                            active={nextTodo.priority === 1}
                        />
                        <PriorityRadio
                            priority={0}
                            active={nextTodo.priority === 0}
                        />
                    </Box>
                </Box>
            </Menu>

            <Menu
                anchorEl={dateMenuAnchor}
                open={!!dateMenuAnchor}
                onClose={() => setDateMenuAnchor(null)}
                MenuListProps={{
                    disablePadding: true,
                    sx: {
                        padding: "1rem",
                    },
                }}
            >
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="zh-cn"
                >
                    <DateCalendar
                        disablePast
                        value={nextTodo.date}
                        onChange={handleCalendarChange}
                    />
                </LocalizationProvider>
            </Menu>
        </Fragment>
    );
};

export default TodayPage;

const PriorityRadio = ({ priority, active }) => {
    const styles = {};

    if (active) {
        styles.backgroundColor = "#ecf1ff";
    }

    return (
        <Fragment>
            <Tooltip title={getPriorityProp(priority, "title")} arrow>
                <Box
                    component="li"
                    data-priority={priority}
                    sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "1.5rem",
                        minHeight: "1.5rem",
                        textAlign: "center",
                        fontSize: "1rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                        ...styles,

                        "&:hover::before": {
                            content: `""`,
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            display: "block",
                            width: "130%",
                            height: "130%",
                            borderRadius: "4px",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "rgba(215, 215, 215, 0.3)",
                            pointerEvents: "none",
                        },
                    }}
                >
                    <FontAwesomeIcon
                        icon={faFlag}
                        color={getPriorityProp(priority, "color")}
                        style={{ position: "absolute", pointerEvents: "none" }}
                    />
                </Box>
            </Tooltip>
        </Fragment>
    );
};

const Input = styled.input`
    width: 100%;

    margin-left: 16px;

    border: none;
    outline: none;

    font-size: 1rem;
    line-height: 1.5rem;

    ::placeholder {
        color: rgb(255, 128, 0);
    }

    :focus::placeholder {
        color: rgb(0, 0, 0);
    }
`;
