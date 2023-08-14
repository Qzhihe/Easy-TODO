import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Box, Menu, Select, MenuItem, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const TimePicker = (props) => {
    const {
        value,
        onReset,
        onClose,
        onCommit,
        onDateTimeChange,
        onReminderChange,
        ...others
    } = props;

    const { date, alarm } = value;
    let initReminder = null;

    if (date && alarm) {
        initReminder = `${date.diff(alarm, "minute")}`;
    }

    const [reminder, setReminder] = useState(initReminder ?? "");

    // handlers
    function handleClose() {
        onClose();
    }

    function handleCommit() {
        onCommit();
        onClose();
    }

    function handleReset() {
        setReminder("");
        onReset();
    }

    function handleDateTimeChange(newValue) {
        newValue = newValue.locale("zh-cn");
        onDateTimeChange(newValue);
    }

    function handleReminderChange(ev) {
        if (date) {
            const delta = parseInt(ev.target.value);
            const reminder = date.subtract(delta, "minute").locale("zh-cn");

            setReminder(ev.target.value);
            onReminderChange(reminder);
        }
    }

    return (
        <Menu
            onClose={handleClose}
            MenuListProps={{
                disablePadding: true,
                sx: {
                    display: "flex",
                    flexFlow: "column nowrap",
                    gap: "1rem",
                    padding: "1rem",
                },
            }}
            {...others}
        >
            <li>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        disablePast
                        ampm={false}
                        label="设置时间"
                        value={date}
                        onChange={handleDateTimeChange}
                    />
                </LocalizationProvider>
            </li>
            <p
                style={{
                    fontSize: "0.8rem",
                    color: "rgba(0, 0, 0, 0.3)",
                }}
            >
                设置提醒
            </p>
            <Select value={reminder} onChange={handleReminderChange} displayEmpty>
                <MenuItem value="" sx={{ fontSize: "0.75rem" }}>
                    无
                </MenuItem>
                <MenuItem value="0" sx={{ fontSize: "0.75rem" }}>
                    准时
                </MenuItem>
                <MenuItem value="5" sx={{ fontSize: "0.75rem" }}>
                    提前 5 分钟
                </MenuItem>
                <MenuItem value="30" sx={{ fontSize: "0.75rem" }}>
                    提前 30 分钟
                </MenuItem>
            </Select>

            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Button onClick={handleReset}>重置</Button>
                <Button onClick={handleCommit}>确认</Button>
            </Box>
        </Menu>
    );
};

export default TimePicker;
