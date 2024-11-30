
import { useLoaderData } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useCarts from '../../Hooks/useCarts';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import Swal from 'sweetalert2';

const SingleProduct = () => {
    let {user} = useAuth();
    let product = useLoaderData();
    let axiosPrivate = useAxiosPrivate();
    let [,, refetch] = useCarts();

    const handleAddtoCart =async (id)=>{
        let cart = {
            productId: id,
            email:user?.email
        }
        let res = await axiosPrivate.post('/api/add-to-cart', cart);
        if(res.data.result){
            refetch();
            Swal.fire({
                title: "Product added successfully",
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


        }else{
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

    return (
        <div className="w-full md:w-10/12 mx-auto px-4 my-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Product Image */}
                <div className="w-full md:w-1/2">
                    <img
                        src={product.product.image} // Assuming the photo URL is stored in the product object
                        alt={product.product.name}
                        className="w-full rounded-lg shadow-md"
                    />
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2 space-y-4">
                    <h1 className="text-3xl font-bold">{product.product.name}</h1>
                    <p className="text-gray-700">{product.product.details}</p>
                    <p className="text-lg font-semibold">
                        Category: <span className="text-teal-600">{product.product.category}</span>
                    </p>
                    <p className="text-lg font-semibold">
                        Color: <span className="text-teal-600">{product.product.color}</span>
                    </p>
                    <p className="text-lg font-semibold">
                        Brand: <span className="text-teal-600">{product.product.brand}</span>
                    </p>
                    <p className="text-2xl font-bold text-teal-700">${product.product.price}</p>

                    {/* Add to Cart Button */}
                    <button
                        className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700"
                        onClick={()=>handleAddtoCart(product.product.id)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
