import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import validate from "../utils/validate";

const defaultTheme = createTheme();

export default function SignUpPage() {
    // 验证注册表单内容
    const checkForm = (data) => {
        let email = data.get('email'),
            password = data.get("psw"),
            password1 = data.get('psw1');

        // 验证表单是否有空项
        if (!email || !password || !password1) {
            alert('注册内容不能为空！');
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

        // 验证两次密码是否相同
        if (password !== password1) {
            alert('两次输入密码不同，请重新检查！');
            return;
        }

        // 发送添加请求
        let userInfo = {
            email, // 邮箱
            password // 密码
        };

        console.log(userInfo);
    };

    // 点击“注册”提交表单
    const handleSubmit = (event) => {
        event.preventDefault();      
        const data = new FormData(event.currentTarget);
        checkForm(data);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{ overflow: "hidden" }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "orange" }}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        注册
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="邮箱"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="psw"
                                    label="密码 - 至少八位, 必须包含字母和数字"
                                    type="password"
                                    id="psw"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="psw1"
                                    label="重复密码 - 与密码一致"
                                    type="password"
                                    id="psw"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            注册
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs>
                                <Link href="signin" variant="body2">
                                    已有账号, 去登录
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/" variant="body2">
                                    返回首页
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
