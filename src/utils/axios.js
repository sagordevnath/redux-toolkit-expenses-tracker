import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://balance-transactions.herokuapp.com",
});

export default axiosInstance;
