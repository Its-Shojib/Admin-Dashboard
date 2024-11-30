import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useCarts = () => {
    let axiosPrivate = useAxiosPrivate();
    let {user} = useAuth();
    const { data: carts = [], isPending:cartsPending, refetch } = useQuery({
        queryKey: ['fetch-carts'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/api/carts/${user?.email}`);
            return res.data.carts || [];
        }
    });
    return [carts, cartsPending, refetch];
};

export default useCarts;