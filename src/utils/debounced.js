function debounced(func, wait) {
    let timeout; 
    return function () {
        let context = this; 
        let args = arguments; 

        clearTimeout(timeout); 
        timeout = setTimeout(function () {
            func.apply(context, args); 
        }, wait);
    };
}
export default debounced;
