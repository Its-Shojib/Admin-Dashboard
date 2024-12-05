import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";


const UseLoadPaymentHistory = () => {
    let axiosPrivate = useAxiosPrivate()
    let { user } = useAuth();
    const { data: payments = [], isPending:paymentsPending, refetch } = useQuery({
        queryKey: ['all-payment-history'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`api/payment/history?email=${user?.email}`);
            console.log(res.data)
            return res.data.payments || [];
        }
    });
    return [payments, paymentsPending, refetch];
};

export default UseLoadPaymentHistory;