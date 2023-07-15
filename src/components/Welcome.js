import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import { Fragment } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const Welcome = (props) => {
    // 跳转至GitHub主仓库
    const toGithub = () => {
        window.open("https://github.com/Qzhihe/Easy-TODO");
    };
    // 展示大图
    const [open, setOpen] = useState(false);
    const handleClickImg = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <Wrapper>
                <div className="container">
                    <div className="navbar">
                        <hr />
                        <i className="nav">
                            <Link to="/signin">
                                Sign In
                            </Link>
                        </i>
                        <i className="nav" onClick={toGithub}>
                            Github
                        </i>
                    </div>
                    <div className="content">
                        <p className="msg">更轻 更简 更快</p>
                        <div className="title">
                            <div className="text">Easy TODO</div>
                            <div className="cir"></div>
                        </div>
                    </div>
                    <div className="footer">
                        <hr />
                        <div className="other">
                            <div className="about">
                                <p>关于项目</p>
                                <p>这是一个简单的个人日程管理系统:D</p>
                                <p>7/10/2023 by Fword-TODOS-Team</p>
                            </div>
                            <div className="concat">
                                <p>进群交流</p>
                                <img
                                    className="qrimg"
                                    src="./feishuQR.png"
                                    alt="飞书"
                                    onClick={handleClickImg}
                                />
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>飞书交流群</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            <img
                                                src="./feishuQR.png"
                                                alt="feishu"
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                }}
                                            />
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>
                                            关闭
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </Fragment>
    );
};

export default Welcome;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;

    position: relative;
    overflow: hidden;
    background: transparent url("./sunset.jpg") center no-repeat;
    background-attachment: fixed;
    background-size: cover;

    .container {
        margin: auto;

        width: 90%;
        height: 90%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        padding: 10px;
    }

    .navbar {
        /* background-color: aliceblue; */
        height: 10vh;
        width: 100%;
        text-align: right;
    }
    hr {
        border: 1px solid gray;
    }
    .nav {
        font-size: 18px;
        margin: 10px;
    }
    .nav:hover {
        color: gray;
        cursor: pointer;
    }

    .content {
        /* background-color: antiquewhite; */
        height: 20vh;
        width: 100%;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        overflow: hidden;
    }
    .msg {
        margin-left: 100px;
        font-size: 20px;
        font-weight: 300;
    }
    .title {
        margin-left: 100px;
        display: flex;
        padding-right: 50px;
        align-items: baseline;
    }
    .text {
        font-size: 50px;
        font-weight: 600;
        cursor: pointer;
    }
    .cir {
        margin-left: 5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: rgb(0, 255, 55);
    }

    .footer {
        /* background-color: aqua; */
        height: 10vh;
        width: 100%;
        text-align: center;
        margin-top: 100px;
    }
    .other {
        margin-top: 10px;
        padding: 5px;
        display: flex;
        justify-content: space-around;
        font-size: 15px;
        font-weight: 400;
        color: black;
    }
    .qrimg {
        height: 60px;
        width: 60px;
        cursor: pointer;
    }
`;
