import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";


const UseLoadMyPaymentHistory = () => {
    let axiosPrivate = useAxiosPrivate()
    let { user } = useAuth();
    const { data: payments = [], isPending:paymentsPending, refetch } = useQuery({
        queryKey: ['my-payment-history'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`api/payment-history/${user?.email}`);
            console.log(res.data)
            return res.data.payments || [];
        }
    });
    return [payments, paymentsPending, refetch];
};

export default UseLoadMyPaymentHistory;