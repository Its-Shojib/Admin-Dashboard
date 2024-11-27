import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const UseLoadUsers = () => {
    let axiosPrivate = useAxiosPrivate()
    let { user } = useAuth();
    const { data: users = [], isPending:userPending, refetch } = useQuery({
        queryKey: ['load-users'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`api/admin-home/users?email=${user?.email}`);
            return res.data.users || [];
        }
    });
    return [users, userPending, refetch];
};

export default UseLoadUsers;