import { useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import UseLoadProducts from "../../Hooks/useLoadProducts";
import Swal from "sweetalert2";

const ManageProducts = () => {
    const [products, productPending, refetch] = UseLoadProducts();
    let axiosPrivate = useAxiosPrivate();
    let navidate = useNavigate();


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
                        refetch();
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
                productPending ? (
                    <div className="text-center h-screen">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse ">
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
                            {products.map((product, index) => (
                                <tr key={product?.id} className="hover:bg-gray-50">
                                    <td className=" p-2">{index + 1}</td>
                                    <td className=" p-2">
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

        </div>
    );
};

export default ManageProducts;
