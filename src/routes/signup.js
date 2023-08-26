import { memo, useRef, useState } from "react";
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
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { Input } from "@mui/base";
import { doLogin, doSignup } from "../api/app";
import { useNavigate } from "react-router-dom";
import { centerCrop, makeAspectCrop, ReactCrop } from "react-image-crop";
import useDebounceEffect from "../utils/useDebouncedEffect";
import canvasPreview from "../utils/canvasPreview";

const defaultTheme = createTheme();

const SignUpPage = memo(() => {
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
            avatar: avatar, // 头像
            username: email, // 用户名
            email: email, // 邮箱
            password: password, // 密码
        };

        try {
            const result = await doSignup(userInfo);
            if (result.code === 20000) {
                autoSignIn(email, password);
            } else if (result.code === 20002) {
                providerRef.current.enqueueSnackbar("已有账号", {
                    variant: "warning",
                });
            }
        } catch (err) {
            providerRef.current.enqueueSnackbar("注册失败", {
                variant: "warning",
            });
        }
    }

    async function autoSignIn(email, password) {
        try {
            const res = await doLogin(email, password);
            if (res.code === 20000) {
                localStorage.setItem("authToken", res.data.token);
                navigate("/views/today", { replace: true });
            }
        } catch (err) {
            providerRef.current.enqueueSnackbar("自动登录失败", {
                variant: "warning",
            });
        }
    }

    // 点击“注册”提交表单
    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        checkForm(data);
    }

    const aspect = 1 / 1; // 图片比例
    const imgRef = useRef(null); // 初始图片标识
    const previewCanvasRef = useRef(null); // 剪裁预览图片标识
    const [img, setImg] = useState(""); // 初始图片src
    const [avatar, setAvatar] = useState(""); // 最终图片数据（放注册信息中，类型等后期规范）
    const [crop, setCrop] = useState(undefined); // 待剪切图画
    const [completedCrop, setCompletedCrop] = useState(); // 剪切后图画
    // const blobUrlRef = useRef("");
    // const hiddenAnchorRef = useRef(null); // 隐藏图片下载标识
    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    1,
                    0
                );
            }
        },
        100,
        [completedCrop]
    );

    // 更改图片
    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            setCrop(undefined);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImg(reader.result?.toString() || "");
            });
            reader.readAsDataURL(file);
        }
    }
    // 创建一个剪裁框
    function centerAspectCrop(width, height) {
        return centerCrop(
            makeAspectCrop({ unit: "%", width: 100 }, aspect, width, height),
            width,
            height
        );
    } 
    // 剪裁加载
    function onImageLoad(event) {
        const { width, height } = event.currentTarget;
        setCrop(centerAspectCrop(width, height, aspect));
    }
    function handleComplete(c) {
        if (c?.width < 100) {
            providerRef.current.enqueueSnackbar("图片剪裁得太小啦！", {
                variant: "warning",
            });
            return;
        }
        setCompletedCrop(c);
    }
    // 点击更新，储存剪裁图片
    function onUpdateClick() {
        if (!imgRef.current) {
            providerRef.current.enqueueSnackbar("没有上传任何图片", {
                variant: "warning",
            });
            return;
        }
        if (previewCanvasRef.current) {
            previewCanvasRef.current.toBlob((blob) => {
                if (!blob) {
                    throw new Error("Failed to create blob");
                }
                setAvatar(blob); // 待传入的头像参数

                // 裁剪图片下载测试
                // if (blobUrlRef.current) {
                //     URL.revokeObjectURL(blobUrlRef.current);
                // }
                // blobUrlRef.current = URL.createObjectURL(blob);
                // hiddenAnchorRef.current.href = blobUrlRef.current;
                // hiddenAnchorRef.current.click();
            });
        }
        setOpen(false);
    }

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
                            onClick={() => setOpen(true)}
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
                    <DialogTitle
                        style={{
                            userSelect: "none",
                        }}
                    >
                        更换头像(请框取头像)
                    </DialogTitle>
                    <DialogContent
                        style={{
                            height: "100%",
                            overflow: "auto",
                        }}
                    >
                        {img && (
                            <ReactCrop
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                                crop={crop}
                                aspect={aspect}
                                onChange={(_, precentCrop) =>
                                    setCrop(precentCrop)
                                }
                                onComplete={(c) => handleComplete(c)}
                            >
                                <img
                                    ref={imgRef}
                                    src={img}
                                    onLoad={onImageLoad}
                                    alt="Avatar"
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        transform: "scale(1)",
                                    }}
                                />
                            </ReactCrop>
                        )}
                        {!!completedCrop && (
                            <canvas
                                ref={previewCanvasRef}
                                style={{
                                    objectFit: "contain",
                                    border: "1px solid black",
                                    width: completedCrop.width,
                                    height: completedCrop.height,
                                }}
                            />
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <Button
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            取消
                        </Button>
                        <Button onClick={onUpdateClick}>更新</Button>
                        {/* <a
                            ref={hiddenAnchorRef}
                            download
                            style={{ visibility: "hidden" }}
                        >
                            hidden download
                        </a> */}
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </SnackbarProvider>
    );
});
export default SignUpPage;
