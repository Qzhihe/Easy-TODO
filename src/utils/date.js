import dayjs from "dayjs";

export function getCalendarDate(date) {
    if (!date) {
        return null;
    }

    const delta = Math.floor(date.diff(dayjs(), "day", true));

    if (delta < 0) {
        return "过期";
    }

    switch (delta) {
        case 0:
            return `今天 ${date.format("hh:mm")}`;
        case 1:
            return `明天 ${date.format("hh:mm")}`;
        case 2:
            return `后天 ${date.format("hh:mm")}`;
        default:
            return date.locale("zh-cn").format("M月D日");
    }
}
