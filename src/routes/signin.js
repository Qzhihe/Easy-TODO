import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import validate from "../utils/validate";

const defaultTheme = createTheme();

export default function SignInPage() {
    // 验证登录表单
    const checkForm = (data) => {
        let email = data.get("email"),
            password = data.get("password");

        // 验证表单是否有空
        if (!email || !password) {
            alert("不能为空！");
            return;
        }

        // 验证邮箱合法性
        if (!validate.valiEmail(email)) {
            alert('邮箱格式不对');
            return;
        }
        // 验证密码合法性
        if (!validate.valiPwd(password)) {
            alert('密码格式不对');
            return;
        }

        // 验证邮箱合法性
        if (!validate.valiEmail(email)) {
            alert("邮箱格式不对");
            return;
        }
        // 验证密码合法性
        if (!validate.valiPwd(password)) {
            alert("密码格式不对");
            return;
        }

        console.log(email, password);

        // 准备发请求
        let userInfo = {
            email,
            password,
        };

        console.log(userInfo);
    };

    // 点击“登录”提交表单
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        checkForm(data);
    };

    return (
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
                                id="email"
                                label="邮箱地址"
                                name="email"
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
    );
}
