// 节流函数
function throttled(func, delay) {
    let prev = Date.now();
    return function (...args) {
        const now = Date.now();
        if (now - prev >= delay) {
            func.apply(this, args);
            prev = Date.now();
        }
    };
}
export default throttled;