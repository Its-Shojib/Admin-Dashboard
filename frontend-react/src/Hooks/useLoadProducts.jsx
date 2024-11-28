import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const UseLoadProducts = () => {
    let axiosPrivate = useAxiosPrivate()
    const { data: products = [], isPending:productPending, refetch } = useQuery({
        queryKey: ['load-products'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`api/admin-home/products`);
            return res.data.products || [];
        }
    });
    return [products, productPending, refetch];
};

export default UseLoadProducts;