import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import useCarts from "../Hooks/useCarts";
import PropTypes from "prop-types";
import 'animate.css';

const ProductCard = ({ product }) => {
    let { user } = useAuth();
    let axiosPrivate = useAxiosPrivate();
    let navigate = useNavigate();
    let [, , refetch] = useCarts();

    let handleAddToCart = async (id) => {
        if (user && user?.email) {

            let cart = {
                productId: id,
                email: user?.email
            }
            let res = await axiosPrivate.post('/api/add-to-cart', cart);
            if (res.data.result) {
                refetch();
                Swal.fire({
                    title: "Product added to your carts",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
    
    
            } else {
                Swal.fire({
                    title: "Product already exist in carts",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
                refetch();
            }
        }
        else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please Login to add to the Cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
        }
    }
    return (
        <div
            key={product.id}
            className="card w-full shadow-inner max-h-[370px] p-5"
        >
            <figure className="px-5 pt-5">
                <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-xl w-full h-72 object-cover"
                />
            </figure>
            <div className="items-center text-center">
                <h2 className=" text-center text-lg font-semibold">
                    {product.name}
                </h2>
                <p className="text-sm text-gray-600">
                    Color: {product.color}
                </p>
                <p className="text-sm font-bold text-gray-800">
                    Price: ${product.price}
                </p>
                <div className="card-actions flex justify-center gap-2 mt-4">
                    <button onClick={() => navigate(`/product/${product?.id}`)} className="btn btn-primary">
                        View Details
                    </button>
                    <button onClick={() => handleAddToCart(product.id)} className="btn btn-secondary">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
ProductCard.propTypes = {
    product: PropTypes.object
};
export default ProductCard;