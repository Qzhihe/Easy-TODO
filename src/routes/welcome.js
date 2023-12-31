import { Fragment, useState } from "react";
import { load as PoemLoader } from "jinrishici";
import { Link as RouteLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircle } from "@fortawesome/free-solid-svg-icons";

import {
    Box,
    Paper,
    Button,
    AppBar,
    Dialog,
    Divider,
    Snackbar,
    Typography,
    DialogTitle,
    DialogActions,
    DialogContent,
    Link as MuiLink,
    DialogContentText,
} from "@mui/material";

import throttled from "../utils/throttled";

const WelcomePage = (props) => {
    const [open, setOpen] = useState(false);
    const [poem, setPoem] = useState("试试点击↑");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    
    const randomPoem = throttled(
        () => {
            PoemLoader((result) => {
                setPoem(result.data.content);
            });
        },
        1000,
        snackbarOpen,
        setSnackbarOpen
    );

    return (
        <Fragment>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={1000}
                message="点击过快！"
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            ></Snackbar>

            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    minHeight: "100%",
                    padding: "32px 64px",
                    background:
                        'transparent url("./sunset.jpg") center no-repeat',
                    backgroundSize: "cover",
                }}
            >
                <AppBar
                    position="relative"
                    sx={{
                        display: "grid",
                        gridTemplate: "2fr auto / 1fr auto",
                        alignItems: "center",
                        gap: "12px 24px",
                        width: "100%",
                        boxShadow: "none",
                        background: "none",
                    }}
                >
                    <Divider
                        sx={{
                            gridColumn: "span 2",
                            borderColor: "rgb(0, 0, 0)",
                        }}
                    />
                    <RouteLink
                        to="/signin"
                        style={{
                            justifySelf: "end",
                            textDecoration: "none",
                            color: "rgb(0, 0, 0)",
                        }}
                    >
                        Sign In
                    </RouteLink>
                    <MuiLink
                        href="https://github.com/Qzhihe/Easy-TODO"
                        target="_blank"
                        underline="none"
                        sx={{ color: "rgb(0, 0, 0)" }}
                    >
                        Github
                    </MuiLink>
                </AppBar>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexFlow: "column nowrap",
                    }}
                >
                    <Typography variant="h4">更轻 更简 更快</Typography>
                    <Box sx={{ display: "flex", alignItems: "baseline" }}>
                        <Typography
                            variant="h2"
                            onClick={() => randomPoem()}
                            sx={{ userSelect: "none", cursor: "pointer" }}
                        >
                            Easy TODO
                        </Typography>
                        <FontAwesomeIcon
                            icon={faCircle}
                            style={{
                                color: "rgb(0,222,0)",
                                width: ".6rem",
                                margin: ".5rem",
                            }}
                            beatFade
                        />
                    </Box>
                    <Typography>{poem}</Typography>
                </Box>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplate: "1fr auto / 1fr 1fr",
                        alignItems: "center",
                        gap: "12px 0",
                        height: "auto",
                    }}
                >
                    <Divider
                        sx={{
                            gridColumn: "span 2",
                            borderColor: "rgb(0, 0, 0)",
                        }}
                    />
                    <Box sx={{ justifySelf: "start" }}>
                        <Typography>
                            关于项目 <br />
                            这是一个简单的个人日程管理系统:D <br />
                            7/10/2023 by Group 3
                        </Typography>
                    </Box>
                    <Box sx={{ justifySelf: "end" }}>
                        <Typography>进群交流</Typography>
                        <img
                            src="./feishuQR.png"
                            alt="飞书"
                            onClick={() => setOpen(true)}
                            style={{
                                width: "64px",
                                height: "64px",
                            }}
                        />
                    </Box>
                </Box>
            </Paper>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>飞书交流群</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <img
                            src="./feishuQR.png"
                            alt="feishu"
                            style={{
                                width: "100%",
                            }}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>关闭</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default WelcomePage;
