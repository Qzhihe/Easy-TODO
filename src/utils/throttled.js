// 节流函数
function throttled(func, delay) {
    let timer = null,
        context = this,
        args = arguments;
    return function() {
        if (!timer) {
            timer = setTimeout(function() {
                func.apply(context, args);
            }, delay);
        }
    };
};
export default throttled;