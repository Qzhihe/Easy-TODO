import dayjs from "dayjs";
import styled from "styled-components";
import calendar from "dayjs/plugin/calendar";
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

import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";

import { StoreContext } from "../store/store";
import TodoList from "../components/TodoList";
import { sendRequest } from "../utils/request";

dayjs.extend(localizedFormat);

function getDateTooltipTitle(date) {
    if (!date) {
        return null;
    }

    const delta = Math.ceil(date.diff(dayjs(), "day", true));

    switch (delta) {
        case 0:
            return "今天";
        case 1:
            return "明天";
        case 2:
            return "后天";
        default:
            return `${date.get("month")} 月 ${date.get("date")} 日`;
    }
}

function getPriorityTooltipTitle(priority) {
    switch (priority) {
        case "high":
            return "高优先级";
        case "medium":
            return "中优先级";
        case "low":
            return "低优先级";
        case "none":
            return "无优先级";
        default:
            return null;
    }
}

const TodayPage = (props) => {
    const { store, setStore } = useContext(StoreContext);

    const [nextTodo, setNextTodo] = useState({
        date: null,
        title: null,
        alarm: null,
        priority: null,
    });
    const [nightTheme, setChangeTheme] = useState(false);
    const [dateMenuAnchor, setDateMenuAnchor] = useState(null);
    const [priorityMenuAnchor, setPriorityMenuAnchor] = useState(null);

    const { todoList } = store;
    let themeIcon = nightTheme ? faMoon : faSun;

    useEffect(() => {
        // (async () => {
        //     try {
        //         const res = await sendRequest({
        //             url: "/schedule/all",
        //             method: "get",
        //         });
        //         console.log(res);
        //     } catch (err) {
        //         console.error(err);
        //     }
        // })();
    }, []);

    // TODO: 主题更换
    function changeTheme() {
        setChangeTheme(!nightTheme);
    }

    function addTodo(todo) {
        const updatedList = [todo, ...todoList];
        setStore((prev) => ({ ...prev, todoList: updatedList }));
    }

    function handleCalendarChange(date, state) {
        if (state === "finish") {
            setDateMenuAnchor(null);
        }
        setNextTodo({ ...nextTodo, date });
    }

    function handlePriorityChange(ev) {
        const priority = ev.target.getAttribute("data-priority");
        setNextTodo({ ...nextTodo, priority });
    }

    function handleFormEnter(ev) {
        if (ev.key === "Enter") {
            let title = ev.target.value;

            setNextTodo({
                title,
                type: "任务",
            });

            addTodo(nextTodo);

            title = "";
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
                        onKeyDown={handleFormEnter}
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
                                    getPriorityTooltipTitle(
                                        nextTodo.priority
                                    ) ?? "设置优先级"
                                }
                            >
                                <IconButton
                                    onClick={(ev) =>
                                        setPriorityMenuAnchor(ev.target)
                                    }
                                >
                                    <FontAwesomeIcon
                                        className={`priority-${nextTodo.priority}`}
                                        icon={faFlag}
                                        size="2xs"
                                    />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box component="li" sx={{ display: "block" }}>
                            <Tooltip
                                title={
                                    getDateTooltipTitle(nextTodo.date) ??
                                    "设置时间"
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
                                                : ""
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
                            priority="high"
                            active={nextTodo.priority === "high"}
                        />
                        <PriorityRadio
                            priority="medium"
                            active={nextTodo.priority === "medium"}
                        />
                        <PriorityRadio
                            priority="low"
                            active={nextTodo.priority === "low"}
                        />
                        <PriorityRadio
                            priority="none"
                            active={nextTodo.priority === "none"}
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
            <Tooltip title={getPriorityTooltipTitle(priority)} arrow>
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
                        className={`priority-${priority}`}
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
