// date time day
const date = new Date();
// 格式化后年月日
function formatDate() {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year} 年 ${month} 月 ${day} 日`;
}
// 星期
function day() {
    // 日期-星期
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return weekdays[date.getDay()];
}

const dtd = { formatDate, day };

export default dtd;