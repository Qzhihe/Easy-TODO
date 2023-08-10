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
    Toolbar,
    Button,
    TextareaAutosize,
    Dialog,
    DialogTitle,
    DialogActions,
} from "@mui/material";

import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import {
    faPlus,
    faFlag,
    faTrashCan,
    faCircleNotch,
    faCircleCheck,
    faChevronDown,
    faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

import { faSun } from "@fortawesome/free-regular-svg-icons";

import { StoreContext } from "../store/store";
import TodoList from "../components/TodoList";
import { getPriorityProp } from "../utils/priority";
import { getCalendarDate } from "../utils/date";
import { sendRequest } from "../utils/request";
import PriorityRadio from "../components/PriorityRadio";
import { addTodo, deleteTodo, getTodoList, updateTodo } from "../api/todo";

dayjs.extend(localizedFormat);

const defaultNextTodo = {
    title: "",
    date: null,
    alarm: null,
    priority: 0,
    isDone: false,
    category: null,
    description: "",
};

const TodayPage = (props) => {
    const { store, setStore } = useContext(StoreContext);

    // const [nightTheme, setChangeTheme] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [cpltIcon, setCpltIcon] = useState(faCircleNotch);
    const [nextTodo, setNextTodo] = useState(defaultNextTodo);
    const [dateMenuAnchor, setDateMenuAnchor] = useState(null);
    const [deDateMenuAnchor, setDeDateMenuAnchor] = useState(null);
    const [selectedTodo, setSelectedTodo] = useState(defaultNextTodo);
    const [priorityMenuAnchor, setPriorityMenuAnchor] = useState(null);
    const [dePriorityMenuAnchor, setDePriorityMenuAnchor] = useState(null);

    // let themeIcon = nightTheme ? faMoon : faSun;
    const todoList = store.todoList;
    const undoneList = todoList.filter((item) => !item.isDone);
    const doneList = todoList.filter((item) => item.isDone);
    // function getTodos() {}

    useEffect(() => {
        (async () => {
            try {
                const result = await getTodoList();

                result.sort((a, b) => b.id - a.id);
                setStore((prev) => ({ ...prev, todoList: result }));
            } catch (err) {
                console.error(err);
            }
        })();
    }, [setStore]);

    // TODO: 主题更换
    // function changeTheme() {
    //     setChangeTheme(!nightTheme);
    // }

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

    async function handleInputEnter(ev) {
        if (ev.key === "Enter" && nextTodo.title) {
            try {
                const result = await addTodo(nextTodo);

                const currentList = [{ ...nextTodo, result }, ...todoList];
                setStore((prev) => ({ ...prev, todoList: currentList }));

                setNextTodo(defaultNextTodo);
            } catch (err) {
                console.error(err);
            }
        }
    }

    async function handleCplt(todo) {
        const { date, id, ...others } = todo;
        const payload = {
            ...others,
            scheId: id,
            sTime: date && date.toJSON(),
        };
        try {
            const data = await sendRequest({
                method: "PUT",
                url: "/schedule",
                data: payload,
            });
            if (data.code === 20000) {
                const updatedTodoList = todoList.reduce((prev, cur) => {
                    if (cur.id === todo.id) {
                        prev.push(todo);
                    } else {
                        prev.push(cur);
                    }
                    return prev;
                }, []);
                setStore((prev) => ({ ...prev, todoList: updatedTodoList }));
            }
        } catch (err) {
            console.error(err);
        }
    }

    function handleSelectTodo(todo) {
        setShowDetail(true);
        setCpltIcon(todo.isDone ? faCircleCheck : faCircleNotch);
        setSelectedTodo(todo);
    }

    function handleDetialTitleChange(event) {
        let newTitle = event.target.value;
        setHasChanged(true);
        setSelectedTodo({ ...selectedTodo, title: newTitle });
    }

    function handleDetailDescChange(event) {
        let newDesc = event.target.value;
        setHasChanged(true);
        setSelectedTodo({ ...selectedTodo, description: newDesc });
    }

    function handleDetailCplt() {
        setSelectedTodo({ ...selectedTodo, isDone: !selectedTodo.isDone });
        setCpltIcon(cpltIcon === faCircleCheck ? faCircleNotch : faCircleCheck);
        setHasChanged(true);
    }

    function handleDetailDate(event) {
        setDeDateMenuAnchor(event.target);
    }

    function handleDeCalendarChange(date, state) {
        if (state === "finish") {
            setDeDateMenuAnchor(null);
        }
        setHasChanged(true);
        setSelectedTodo({ ...selectedTodo, date: date });
    }

    function handleDetailPri(event) {
        setDePriorityMenuAnchor(event.target);
    }

    function handleDePriorityChange(ev) {
        const priority = parseInt(ev.target.getAttribute("data-priority"));
        setHasChanged(true);
        setSelectedTodo({ ...selectedTodo, priority });
    }

    function makeConfirm() {
        setOpenDialog(true);
    }

    async function handleDetialDelete() {
        try {
            const result = await deleteTodo(selectedTodo);

            if (result) {
                const deletedTodoList = todoList.filter((item) => item.id !== selectedTodo.id);
                
                setStore((prev) => ({ ...prev, todoList: deletedTodoList }));
                
                setHasChanged(false);
                setShowDetail(false);
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function handleSubmit() {
        try {
            const result = await updateTodo(selectedTodo);
            
            if (result) {
                const updatedTodoList = todoList.reduce((prev, cur) => {
                    cur.id === selectedTodo.id
                    ? prev.push(selectedTodo)
                    : prev.push(cur);
                    return prev;
                }, []);
                
                setStore((prev) => ({ ...prev, todoList: updatedTodoList }));
                
                setHasChanged(false);
                setShowDetail(false);
            }
        } catch (err) {
            console.error(err);
        }
    }

    function handleCancel() {
        setHasChanged(false);
        setShowDetail(false);
    }

    return (
        <Fragment>
            <Box
                id="container"
                sx={{
                    display: "flex",
                    flexFlow: "row nowrap",
                    overflow: "hidden",
                    "@media (max-width: 900px)": {
                        gridArea: "2 / 2 / 2 / 2",
                    },
                }}
            >
                <Box
                    id="todolistcontainer"
                    sx={{
                        display: "flex",
                        flexGrow: 1,
                        flexFlow: "column nowrap",
                        gap: "1.25rem",
                        padding: "1rem 2rem",
                    }}
                >
                    <Card
                        id="info"
                        sx={{
                            display: "flex",
                            flexShrink: "0",
                            flexFlow: "column nowrap",
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
                                gap: "0 0.5rem",
                            }}
                        >
                            <Box>
                                <FontAwesomeIcon icon={faSun} size="xl" />
                            </Box>
                            <Typography
                                sx={{
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
                                fontSize: "0.9rem",
                                fontWeight: "100",
                                userSelect: "none",
                            }}
                        >
                            {dayjs()
                                .locale("zh-cn")
                                .format("YYYY 年 M 月 D 日 dddd")}
                        </Typography>
                    </Card>

                    <Card
                        sx={{
                            flexShrink: "0",
                            padding: "0 1.25rem",
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
                                                color={`rgb(${getPriorityProp(
                                                    nextTodo.priority,
                                                    "color"
                                                )})`}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Box component="li" sx={{ display: "block" }}>
                                    <Tooltip
                                        title={
                                            getCalendarDate(nextTodo.date) ??
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
                                                        : "#a2a2a2"
                                                }
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </Box>
                    </Card>

                    <div
                        style={{
                            display: "flex",
                            flexFlow: "column nowrap",
                            gap: "1rem",
                            overflow: "auto",
                        }}
                    >
                        <Catalog title="未完成" count={undoneList.length} />
                        <TodoList
                            data={undoneList}
                            onHandleSelectTodo={handleSelectTodo}
                            onHandleCplt={handleCplt}
                        />

                        <Catalog title="已完成" count={doneList.length} />
                        <TodoList
                            data={doneList}
                            onHandleSelectTodo={handleSelectTodo}
                            onHandleCplt={handleCplt}
                        />
                    </div>
                </Box>

                {showDetail && (
                    <Card
                        id="detialcontainer"
                        sx={{
                            width: "30%",
                            height: "100%",
                            backgroundColor: "rgb(255, 255, 255)",
                            display: "flex",
                            flexFlow: "column nowrap",
                        }}
                    >
                        <Box
                            id="detial"
                            sx={{
                                width: "100%",
                                height: "4rem",
                                padding: "0 12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "10px",
                            }}
                        >
                            <Tooltip
                                title={
                                    selectedTodo && selectedTodo.isDone
                                        ? "已完成"
                                        : "未完成"
                                }
                            >
                                <IconButton onClick={handleDetailCplt}>
                                    <FontAwesomeIcon
                                        size="sm"
                                        icon={
                                            selectedTodo.isDone
                                                ? faCircleCheck
                                                : faCircleNotch
                                        }
                                        color={
                                            selectedTodo
                                                ? "rgb(255, 128, 0)"
                                                : "rgb(162, 162, 162)"
                                        }
                                    />
                                </IconButton>
                            </Tooltip>

                            <Tooltip
                                title={
                                    selectedTodo &&
                                    getCalendarDate(selectedTodo.date)
                                }
                            >
                                <IconButton onClick={handleDetailDate}>
                                    <FontAwesomeIcon
                                        size="sm"
                                        icon={faCalendarDays}
                                        color={
                                            selectedTodo && selectedTodo.date
                                                ? getCalendarDate(
                                                      selectedTodo.date
                                                  ) === "过期"
                                                    ? "rgb(224, 49, 48)"
                                                    : "rgb(71, 114, 249)"
                                                : "rgb(162, 162, 162)"
                                        }
                                    />
                                </IconButton>
                            </Tooltip>

                            <Tooltip
                                title={
                                    selectedTodo &&
                                    getPriorityProp(
                                        selectedTodo.priority,
                                        "title"
                                    )
                                }
                            >
                                <IconButton onClick={handleDetailPri}>
                                    <FontAwesomeIcon
                                        size="sm"
                                        icon={faFlag}
                                        color={
                                            selectedTodo
                                                ? `rgb(${getPriorityProp(
                                                      selectedTodo.priority,
                                                      "color"
                                                  )})`
                                                : "rgb(162, 162, 162)"
                                        }
                                    />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title={selectedTodo && "删除"}>
                                <IconButton onClick={makeConfirm}>
                                    <FontAwesomeIcon
                                        size="sm"
                                        icon={faTrashCan}
                                        color={
                                            selectedTodo
                                                ? "gray"
                                                : "rgb(162, 162, 162)"
                                        }
                                    />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        {/* <Box
                        sx={{
                            width: "100%",
                        }}
                    >
                        <Slider
                            aria-label="Temperature"
                            defaultValue={0}
                            // getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            step={10}
                            marks
                            min={0}
                            max={100}
                        />
                    </Box> */}

                        <Box
                            id="title"
                            sx={{
                                width: "100%",
                                height: "4rem",
                                padding: "0 12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "start",
                                gap: "10px",
                            }}
                        >
                            <Input
                                style={{
                                    fontSize: "1.2rem",
                                    fontWeight: "600",
                                }}
                                value={selectedTodo && selectedTodo.title}
                                onChange={handleDetialTitleChange}
                            />
                        </Box>

                        <Box
                            id="description"
                            sx={{
                                width: "100%",
                                maxHeight: "60%",
                                display: "flex",
                                justifyContent: "start",
                                gap: "10px",
                            }}
                        >
                            <TextareaAutosize
                                maxRows="18"
                                style={{
                                    width: "100%",
                                    fontSize: "0.875rem",
                                    fontWeight: "400",
                                    lineHeight: "1.5",
                                    padding: "12px",
                                    borderRadius: "12px 12px 0 12px",
                                    color: "#24292f",
                                    background: "#fff",
                                    border: "1px solid #d0d7de",
                                    boxShadow: "0px 2px 2px #f6f8fa",

                                    "&:hover": {
                                        borderColor: "#3399FF",
                                    },

                                    "&:focus": {
                                        borderColor: "#3399FF",
                                        boxShadow: "0 0 0 3px #b6daff",
                                    },

                                    "&:focusVisible": {
                                        outline: "0",
                                    },
                                }}
                                value={
                                    selectedTodo ? selectedTodo.description : ""
                                }
                                onChange={handleDetailDescChange}
                            />
                        </Box>

                        <Box
                            id="submitbtn"
                            sx={{
                                marginTop: "10px",
                                width: "100%",
                                display: "flex",
                                flexFlow: "row nowrap",
                                justifyContent: "space-around",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                sx={{
                                    width: "40%",
                                    color: "black",
                                }}
                                onClick={() => {
                                    handleCancel();
                                }}
                            >
                                取消
                            </Button>
                            {!hasChanged ? (
                                <Button
                                    sx={{
                                        width: "40%",
                                        color: "black",
                                    }}
                                    disabled
                                >
                                    保存
                                </Button>
                            ) : (
                                <Button
                                    sx={{
                                        width: "40%",
                                        color: "black",
                                    }}
                                    onClick={() => {
                                        handleSubmit();
                                    }}
                                >
                                    保存
                                </Button>
                            )}
                        </Box>
                    </Card>
                )}
            </Box>

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
                anchorEl={dePriorityMenuAnchor}
                open={!!dePriorityMenuAnchor}
                onClick={() => setDePriorityMenuAnchor(null)}
                onClose={() => setDePriorityMenuAnchor(null)}
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
                        onClick={handleDePriorityChange}
                        sx={{
                            display: "flex",
                            gap: "0 0.75rem",
                        }}
                    >
                        <PriorityRadio
                            priority={3}
                            active={selectedTodo.priority === 3}
                        />
                        <PriorityRadio
                            priority={2}
                            active={selectedTodo.priority === 2}
                        />
                        <PriorityRadio
                            priority={1}
                            active={selectedTodo.priority === 1}
                        />
                        <PriorityRadio
                            priority={0}
                            active={selectedTodo.priority === 0}
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

            <Menu
                anchorEl={deDateMenuAnchor}
                open={!!deDateMenuAnchor}
                onClose={() => setDeDateMenuAnchor(null)}
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
                        value={selectedTodo.date}
                        onChange={handleDeCalendarChange}
                    />
                </LocalizationProvider>
            </Menu>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>确定要删除该日程吗？</DialogTitle>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenDialog(false);
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        onClick={() => {
                            setOpenDialog(false);
                            handleDetialDelete();
                        }}
                    >
                        确定
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default TodayPage;

const Catalog = (props) => {
    const { title, count } = props;
    return (
        <Fragment>
            <Card
                sx={{
                    display: "flex",
                    boxShadow: "none",
                    backgroundColor: "rgb(245, 245, 245)",
                    overflow: "visible",
                }}
            >
                <Box
                    onClick={() => {}}
                    sx={{
                        display: "grid",
                        gridTemplate: "1fr / auto auto auto",
                        columnGap: "12px",
                        width: "fit-content",
                        userSelect: "none",
                        cursor: "pointer",
                    }}
                >
                    <FontAwesomeIcon icon={faChevronDown} size="lg" />
                    <Typography>{title}</Typography>
                    <Typography>{count}</Typography>
                </Box>
            </Card>
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
