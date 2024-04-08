import axios from "axios";

let api = axios.create({
    // baseURL: 'http://localhost:3000/',
    baseURL: "https://oficina-backend.vercel.app/",
    timeout: 10000,
});

export { api };