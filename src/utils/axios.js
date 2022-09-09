import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://sagor-todo-server.herokuapp.com",
});

export default axiosInstance;
