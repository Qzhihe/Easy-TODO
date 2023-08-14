import { useState, useRef } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Box, Menu, Select, MenuItem, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const DTRPicker = (props) => {
    const {
        value,
        onReset,
        onClose,
        onCommit,
        onDateTimeChange,
        onReminderChange,
        ...others
    } = props;

    const snapshot = useRef(value);

    const { date, alarm } = value;
    const initReminder =
        snapshot.current && snapshot.current.date && snapshot.current.alarm
            ? date.diff(alarm, "minute")
            : null;

    const [reminder, setReminder] = useState(initReminder ?? "");

    // handlers
    function handleClose() {
        onClose(snapshot.current);
    }

    function handleCommit() {
        onCommit();
    }

    function handleReset() {
        setReminder("");
        onReset();
    }

    function handleDateTimeChange(newValue) {
        const date = newValue.locale("zh-cn"),
            alarm =
                reminder === ""
                    ? null
                    : newValue.subtract(reminder, "minute").locale("zh-cn");

        onDateTimeChange({ date, alarm });
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
                        value={date}
                        ampm={false}
                        label="设置时间"
                        format="YYYY-MM-DD hh:mm"
                        onChange={handleDateTimeChange}
                    />
                </LocalizationProvider>
            </li>
            <p className="text-sm text-zinc-400">设置提醒</p>
            <Select
                displayEmpty
                value={reminder}
                onChange={handleReminderChange}
            >
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

export default DTRPicker;
