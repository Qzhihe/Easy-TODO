import axios from "axios";

const service = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 5000,
});

export function sendRequest(config) {
    return new Promise((resolve, reject) => {
        service(config)
            .then(({ data }) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
