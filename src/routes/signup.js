import { useRef, useState } from "react";
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
import { SnackbarProvider } from "notistack";
import { Dialog } from "@mui/material";
import { Input } from "@mui/base";
import { doLogin, doSignup } from "../api/app";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignUpPage() {
    const defaultUserInfo = {
        avatar: "",
        deleted: 0,
        email: "",
        password: "",
        phone: "",
        roleIdList: [0],
        status: 1,
        username: "",
    };
    const providerRef = useRef();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    // 验证注册表单内容
    async function checkForm(data) {
        let email = data.get("email"),
            password = data.get("psw"),
            password1 = data.get("psw1");

        // 验证表单是否有空项
        if (!email || !password || !password1) {
            providerRef.current.enqueueSnackbar("注册内容不能为空！", {
                variant: "error",
            });
            return;
        }
        // 验证邮箱合法性
        if (!validate.valiEmail(email)) {
            providerRef.current.enqueueSnackbar("邮箱格式不合法！", {
                variant: "error",
            });
            return;
        }
        // 验证密码合法性
        if (!validate.valiPwd(password)) {
            providerRef.current.enqueueSnackbar("密码格式不合法！", {
                variant: "error",
            });
            return;
        }

        // 验证两次密码是否相同
        if (password !== password1) {
            providerRef.current.enqueueSnackbar("两次密码输入不同！", {
                variant: "warning",
            });
            return;
        }

        // 发送添加请求
        let userInfo = {
            ...defaultUserInfo,
            username: email,
            email: email, // 邮箱
            password: password, // 密码
        };
        console.log(userInfo);

        try {
            const result = await doSignup(userInfo);
            if (result.code === 20000) {
                console.log("注册成功");
                autoSignIn(email, password);
            } else {
                throw new Error("有问题有问题");
            }
        } catch (err) {
            providerRef.current.enqueueSnackbar("注册失败", {
                variant: "warning",
            });
            console.error(err);
        }
    };

    async function autoSignIn(email, password) {
        try {
            const res = await doLogin(email, password);
            console.log(res);
            if (res.code === 20000) {
                localStorage.setItem("authToken", res.data.token);
                navigate("/views/today", { replace: true });
            }
        } catch (err) {
            providerRef.current.enqueueSnackbar("自动登录失败", {
                variant: "warning",
            });
            console.error(err);
        }
    };

    // 点击“注册”提交表单
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        checkForm(data);
    };

    const handleAvatarClick = () => {
        setOpen(true);
    };

    const handleFileChange = () => {};

    const handleUpload = () => {};

    return (
        <SnackbarProvider ref={providerRef} maxSnack={3}>
            <ThemeProvider theme={defaultTheme}>
                <Container
                    component="main"
                    maxWidth="xs"
                    sx={{ overflow: "hidden" }}
                >
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            sx={{ m: 1, bgcolor: "orange" }}
                            onClick={handleAvatarClick}
                        ></Avatar>
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
                                        id="psw1"
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
                <Dialog
                    open={open}
                    onClose={() => {
                        setOpen(false);
                    }}
                >
                    诶嘿不好意思哦，这里还没有完成，原因是我还没学会。退出对话框的话点击一下对话框以外的任意位置就好。
                    <Input type="file" onChange={handleFileChange} />
                    <Button type="submit" onClick={handleUpload}>
                        更新
                    </Button>
                </Dialog>
            </ThemeProvider>
        </SnackbarProvider>
    );
}
