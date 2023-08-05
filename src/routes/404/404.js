import { Box, Button, Typography } from "@mui/material";
import React, { Fragment } from "react";
import './404.css';

const NotFound = () => {
    const numberOfParticles = 40;

    const getRandomAnimation = () => {
        const animations = ["float", "floatReverse", "float2", "floatReverse2"];
        return animations[Math.floor(Math.random() * animations.length)];
    };

    const getRandomValue = (min, max) =>
        Math.floor(Math.random() * (max - min + 1) + min);

    const generateParticles = () => {
        const particles = [];
        for (let i = 1; i <= numberOfParticles; i++) {
            const size = getRandomValue(10, 30);
            const blur = i * 0.02;
            const speed = getRandomValue(20, 40);
            const anim = getRandomAnimation();
            const particleStyle = {
                position: "absolute",
                display: "block",
                pointerEvents: "none",
                top: `${(getRandomValue(0, 100) / (100 + size / 8)) * 100}%`,
                left: `${(getRandomValue(0, 100) / (100 + size / 10)) * 100}%`,
                fontSize: `${size}px`,
                filter: `blur(${blur}px)`,
                animation: `${anim} ${speed}s ease infinite`, 
            };

            particles.push(
                <span key={i} className="particle" style={particleStyle}>
                    404
                </span>
            );
        }
        return particles;
    };

    return (
        <Fragment>
            <Box
                component="main"
                sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    background: "transparent",
                    overflow: "hidden",
                }}
            >
                {generateParticles()}
                <Box
                    component="article"
                    sx={{
                        position: "relative",
                        width: "600px",
                        maxWidth: "100%",
                        margin: "20px",
                        background: "white",
                        padding: "60px 40px",
                        textAlign: "center",
                        boxShadow: "-10px 10px 67px -12px rgba(0, 0, 0, 0.2)",
                        opacity: '0',
                        animation:
                            "apparition 0.8s 1.2s cubic-bezier(0.39, 0.575, 0.28, 0.995) forwards",
                    }}
                >
                    <Message>😥该网页不存在，</Message>
                    <Message>
                        您已经迷失在 <strong>404</strong> 星系…
                    </Message>
                    <Message>
                        <Button
                            sx={{
                                display: "inline-block",
                                marginTop: "2rem",
                                padding: "0.5rem 1rem",
                                border: "3px solid #595959",
                                background: "transparent",
                                fontSize: "1rem",
                                color: "#595959",
                                textDecoration: "none",
                                cursor: "pointer",
                                fontWeight: "bold",
                            }}
                        >
                            返回地球🌏
                        </Button>
                    </Message>
                </Box>
            </Box>
        </Fragment>
    );
};

export default NotFound;

const Message = ({ children }) => {
    return (
        <Typography
            component="p"
            sx={{
                fontSize: "1.3rem",
                marginTop: 0,
                marginBottom: "0.6rem",
                letterSpacing: "0.1rem",
                color: "#595959",

                "&:last-child": {
                    marginBottom: 0,
                },
            }}
        >
            {children}
        </Typography>
    );
};
