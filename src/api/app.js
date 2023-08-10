import { sendRequest } from "../utils/request";

export const doLogin = async (username, password) => {
    const result = await sendRequest({
        method: "POST",
        url: "/user/login",
        data: {
            username,
            password,
        },
    });

    console.log(result);
};

export const doLogout = () => {};
