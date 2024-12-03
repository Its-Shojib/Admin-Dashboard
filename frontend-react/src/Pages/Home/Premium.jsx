import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ProductCard from "../../components/ProductCard";


const Premium = () => {
    let axiosPublic = useAxiosPublic();

    const { data: premium = [] } = useQuery({
        queryKey: ['premium-product'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/premium-products`);
            return res.data.products || [];
        }
    });


    return (
        <div className="max-w-screen-2xl mx-auto my-20">
            <SectionTitle title={'Premium product'} subtitle={'here our'} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                { premium?.map((product) => (
                        <ProductCard key={product?.id} product={product}/>
                    ))
                }
            </div>
        </div>
    );
};

export default Premium;