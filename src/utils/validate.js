// 邮箱
function valiEmail(param) {
    return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(param);
}
// 密码-至少八位，必须包含数字字母
function valiPwd(param) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(param);
}

const validate = { valiEmail, valiPwd };

export default validate;