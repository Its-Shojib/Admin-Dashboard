import useAuth from "./useAuth";

const useLogout = () => {
    const { setUser} = useAuth();

    const logout = () => {
        // Remove user and token from local storage
        localStorage.removeItem("user");
        localStorage.removeItem("access-token");
        setUser(null);
    };

    return { logout };
};

export default useLogout;
