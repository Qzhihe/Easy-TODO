import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

import {
    Box,
    Link,
    Grid,
    Paper,
    Avatar,
    Button,
    TextField,
    Typography,
    CssBaseline,
} from "@mui/material";

import { doLogin } from "../api/app";

const defaultTheme = createTheme();

const SignInPage = () => {
    const navigate = useNavigate();
    const providerRef = React.useRef();

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const name = data.get("name");
        const pwd = data.get("password");
        if (!name) {
            providerRef.current.enqueueSnackbar("用户名不能为空！", {
                variant: "error",
            });
            return;
        }
        if (!pwd) {
            providerRef.current.enqueueSnackbar("密码不能为空！", {
                variant: "error",
            });
            return;
        }

        try {
            const result = await doLogin(name, pwd);

            if (result.data.code === 20000) {
                localStorage.setItem("authToken", result.data.data.token);
                navigate("/views/today", { replace: true });
            } else {
                providerRef.current.enqueueSnackbar("密码或账号错误", {
                    anchorOrigin: { vertical: "right", horizontal: "top" },
                    variant: "error",
                });
            }
        } catch (err) {
            providerRef.current.enqueueSnackbar("登陆失败，请重试！", {
                anchorOrigin: { vertical: "right", horizontal: "top" },
                variant: "error",
            });
        }
    }

    return (
        <SnackbarProvider ref={providerRef} maxSnack={1}>
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: "100vh" }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: "url(./sunset.jpg)",
                            // 神奇API https://source.unsplash.com/random?wallpapers
                            backgroundRepeat: "no-repeat",
                            backgroundColor: (t) =>
                                t.palette.mode === "light"
                                    ? t.palette.grey[50]
                                    : t.palette.grey[900],
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        component={Paper}
                        elevation={6}
                        square
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: "orange" }}></Avatar>
                            <Typography component="h1" variant="h5">
                                登录
                            </Typography>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={handleSubmit}
                                sx={{ mt: 1 }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="用户名"
                                    name="name"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="用户密码"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    登录
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="signup" variant="body2">
                                            {"没有账号,免费注册"}
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/" variant="body2">
                                            {"返回首页"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </SnackbarProvider>
    );
};

export default SignInPage;
