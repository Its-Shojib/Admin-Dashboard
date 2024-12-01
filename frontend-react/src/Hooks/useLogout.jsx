import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setUser} = useAuth();
    let goto = useNavigate()

    const logout = () => {
        // Remove user and token from local storage
        localStorage.removeItem("user");
        localStorage.removeItem("access-token");
        setUser(null);
        // Redirect to login page
        goto('/login');
        
    };

    return { logout };
};

export default useLogout;
