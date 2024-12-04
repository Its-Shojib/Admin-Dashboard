import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useAdminStatus = () => {
    let axiosPrivate = useAxiosPrivate()
    let {user} = useAuth();
    const { data: status = [], isPending:statusPending, refetch } = useQuery({
        queryKey: ['admin-status'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/api/admin-home/status?email=${user?.email}`);
            console.log(res.data);
            return res.data;
        }
    });
    return [status, statusPending, refetch];
};

export default useAdminStatus;