import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";


const useAdmin = () => {
    const { user } = useAuth();
    const axiosPrivate = useAxiosPrivate()

    const { data: isAdmin, isPending: isAdminPending } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/api/admin/${user?.email}`);
            
            return res.data.result;
        }
    })
    return [isAdmin, isAdminPending];
};

export default useAdmin;