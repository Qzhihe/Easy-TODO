import { memo } from "react";
import { Menu } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const CalendarPicker = memo((props) => {
    const { selectedDate, handleCalendarChange, MenuData } = props;

    function handleChange(date, status) {
        handleCalendarChange?.(date, status);
    }

    return (
        <Menu
            MenuListProps={{
                disablePadding: true,
                sx: {
                    padding: "1rem",
                },
            }}
            {...MenuData}
        >
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="zh-cn"
            >
                <DateCalendar
                    disablePast
                    value={selectedDate}
                    onChange={handleChange}
                />
            </LocalizationProvider>
        </Menu>
    );
});

export default CalendarPicker;
