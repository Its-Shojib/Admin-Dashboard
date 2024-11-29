import { useEffect, useState } from "react";
import useCarts from "../../Hooks/useCarts";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const CartPage = () => {
    const [carts, cartsPending, refetch] = useCarts();
    const [cart, setCart] = useState([]);
    let axiosPrivate = useAxiosPrivate();

    const deleteCart = async (id) => {
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
                    let res = await axiosPrivate.delete(`/api/carts/${id}`);
                    if (res.status === 200) {
                        Swal.fire(
                            "Deleted!",
                            "Item has been deleted.",
                            "success"
                        );
                        refetch();
                    }
                } catch (error) {
                    console.error("Error deleting carts:", error);
                    Swal.fire(
                        "Error!",
                        "An error occurred.",
                        "error"
                    );
                }
            }
        });
    }

    useEffect(() => {
        setCart(carts.map((item) => ({ ...item, quantity: 1 })))
    }, [carts])

    const handleQuantityChange = (id, delta) => {
        const updatedCart = cart.map((item) => {
            if (item.id === id) {
                const newQuantity = item.quantity + delta;
                if (newQuantity > 0) {
                    return { ...item, quantity: newQuantity };
                }
            }
            return item;
        });
        setCart(updatedCart);
    };

    // Function to calculate total price
    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => {
            return total + item.quantity * item.product.price;
        }, 0);
    };

    return (
        <div className="cart-page w-full md:w-10/12 mx-auto px-4">
            {
                cartsPending ? (
                    <div className="text-center flex justify-center items-center h-screen">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <div className="flex justify-center items-start gap-20 my-10">
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold mb-5 text-center">Your Cart items</h1>
                            <div className="cart-items space-y-5">
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="cart-item flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
                                    >
                                        {/* Product Image and Details */}
                                        <div className="flex items-center space-x-4 w-[300px]">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <div>
                                                <h2 className="text-lg font-semibold">{item.product.name}</h2>
                                                <p className="text-gray-600">${item?.product?.price}</p>
                                            </div>

                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, -1)}
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                -
                                            </button>
                                            <span className="text-lg font-bold">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.id, 1)}
                                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => deleteCart(item.id)}
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            {/* Total Price Section */}
                            <div className="total-price mt-8 text-right">
                                <h3 className="text-xl font-bold">
                                    Total Price: ${calculateTotalPrice()}
                                </h3>
                            </div>

                            {/* Pay Now Button */}
                            <div className="mt-4 text-right">
                                <button
                                    onClick={() => alert("Proceeding to payment...")}
                                    className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
                                >
                                    Pay Now
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default CartPage;