import dayjs from "dayjs";

export function getCalendarDate(date) {
    if (!date) {
        return null;
    }

    const delta = Math.ceil(date.diff(dayjs(), "day", true));

    console.log(delta);

    if (delta < 0) {
        return "过期";
    }

    switch (delta) {
        case 0:
            return "今天";
        case 1:
            return "明天";
        case 2:
            return "后天";
        default:
            return date.locale("zh-cn").format("M月D日");
    }
}
