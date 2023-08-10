import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Tooltip } from "@mui/material";
import { Fragment } from "react";
import { getPriorityProp } from "../utils/priority";

const PriorityRadio = ({ priority, active }) => {
    const styles = {};

    if (active) {
        styles.backgroundColor = "#ecf1ff";
    }

    return (
        <Fragment>
            <Tooltip title={getPriorityProp(priority, "title")} arrow>
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
                        color={`rgb(${getPriorityProp(priority, "color")})`}
                        style={{ position: "absolute", pointerEvents: "none" }}
                    />
                </Box>
            </Tooltip>
        </Fragment>
    );
};

export default PriorityRadio;