import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const UseLoadP = () => {
    let axiosPrivate = useAxiosPrivate()
    const { data: products = [], isPending:productPending, refetch } = useQuery({
        queryKey: ['load-p'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/api/products`);
            return res.data.products || [];
        }
    });
    return [products, productPending, refetch];
};

export default UseLoadP;