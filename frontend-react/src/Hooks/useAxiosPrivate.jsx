import axios from "axios";
import useLogout from "./useLogout";

const axiosPrivate = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

const useAxiosPrivate = () => {
    const { logout } = useLogout();

    axiosPrivate.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("access-token"); 
            config.headers.authorization = `Bearer ${token}`;
            return config;
        },
        (error) => {
            console.log(error)
            return Promise.reject(error);
        }
    );

    axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
            console.log(error)
            const status = error?.response?.status;
            console.log(status)
            if (status === 401 || status === 403) {
                logout();
            }
            return Promise.reject(error);
        }
    );

    return axiosPrivate;
};

export default useAxiosPrivate;
