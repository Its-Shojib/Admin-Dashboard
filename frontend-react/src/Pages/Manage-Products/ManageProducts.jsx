import { useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const ManageProducts = () => {
    const [active, setActive] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    let axiosPrivate = useAxiosPrivate();
    let navidate = useNavigate();

    const { data: productsFetch = [], isPending, refetch: productRefetch } = useQuery({
        queryKey: ['products-paginate'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/api/manage-products/paginate/${active}`);
            setTotalPage(res.data.total_pages)
            return res.data.products;
        }
    })

    const next = () => {
        if (active === totalPage) return;
        setActive(active + 1);
        productRefetch();
    };
    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
        productRefetch();
    };
    useEffect(() => {
        productRefetch()
    }, [active, productRefetch])


    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let res = await axiosPrivate.delete(`/api/product/${id}`);
                    if (res.status === 200) {
                        Swal.fire(
                            "Deleted!",
                            "Product has been deleted.",
                            "success"
                        );
                        productRefetch();
                    }
                } catch (error) {
                    console.error("Error deleting product:", error);
                    Swal.fire(
                        "Error!",
                        "An error occurred.",
                        "error"
                    );
                }
            }
        });
    };

    return (
        <div className="w-full px-4">

            <SectionTitle title={'Manage Products'} subtitle={'need details?'}></SectionTitle>
            {
                isPending ? (
                    <div className="text-center h-screen">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : <div className="overflow-x-auto min-h-[550px]">
                    <table className="table-auto w-full border-collapse text-center">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className=" p-2">ID</th>
                                <th className=" p-2">Image</th>
                                <th className=" p-2">Name</th>
                                <th className=" p-2">Category</th>
                                <th className=" p-2">Price</th>
                                <th className=" p-2">Color</th>
                                <th className=" p-2">Brand</th>
                                <th className=" p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsFetch?.map((product, index) => (
                                <tr key={product?.id} className="hover:bg-gray-50">
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2">
                                        <img
                                            src={product?.image}
                                            alt={product?.name}
                                            className="w-16 h-16 object-cover rounded-full"
                                        />
                                    </td>
                                    <td className=" p-2">{product?.name}</td>
                                    <td className=" p-2">{product?.category}</td>
                                    <td className=" p-2">{product?.price}</td>
                                    <td className=" p-2">{product?.color}</td>
                                    <td className=" p-2">{product?.brand}</td>
                                    <td className=" p-2">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                                            onClick={() => navidate(`/dashboard/update-product/${product?.id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-1 rounded"
                                            onClick={() => handleDelete(product?.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            }
            <div className="flex justify-center items-center mt-5">
                <div className="flex items-center gap-8 text=lg">
                    <button className="text-xl"
                        onClick={prev}
                        disabled={active === 1}
                    >
                        <FaArrowAltCircleLeft className="h-8 w-8" />
                    </button>
                    <p color="gray" className="font-normal">
                        Page <strong className="text-gray-900 text-xl">{active}</strong> of{" "}
                        <strong className="text-gray-900 text-xl">{totalPage}</strong>
                    </p>
                    <button className="text-xl"
                        onClick={next}
                        disabled={active === totalPage}
                    >
                        <FaArrowAltCircleRight className="h-8 w-8" />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ManageProducts;
