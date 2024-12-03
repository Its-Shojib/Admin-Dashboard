import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";


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
            <SectionTitle title={'Top sale products'} subtitle={'here our'} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
                {premium?.map((product) => (
                    <ProductCard key={product?.id} product={product} />
                ))
                }
            </div>
            <div className="flex justify-center items-center">
                <button className="bg-black text-white px-4 py-2 rounded-md text-lg"><Link to={'/products'}>See more products</Link></button>
            </div>

        </div>
    );
};

export default Premium;