import { useLoaderData, useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const image_hosting_key = import.meta.env.VITE_IMG_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProduct = () => {
    let data = useLoaderData();
    let axiosPrivate = useAxiosPrivate();
    let navigate = useNavigate();

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const form = e.target;

        // Extract form data
        const name = form.name.value;
        const category = form.category.value;
        const price = form.price.value;
        const color = form.color.value;
        const brand = form.brand.value;
        const details = form.details.value;
        const imageFile = form.photo.files[0];

        let updatedImage = data.product.image; // Default to existing image URL

        try {
            if (imageFile) {
                // If a new image is uploaded
                const formData = new FormData();
                formData.append("image", imageFile);

                const imageRes = await axios.post(image_hosting_api, formData);
                if (imageRes.data.success) {
                    updatedImage = imageRes.data.data.display_url;
                } else {
                    throw new Error("Image upload failed!");
                }
            }

            const updatedProduct = {
                image: updatedImage,
                name,
                category,
                price,
                color,
                brand,
                details,
            };

            const res = await axiosPrivate.put(`/api/products/${data.product.id}`,
                updatedProduct
            );

            if (res.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Product updated successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                form.reset();
                navigate('/dashboard/manage-products');

            } else {
                throw new Error("Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            Swal.fire({
                icon: "error",
                title: "An error occurred",
                text: error.response?.data?.message || error.message,
            });
        }
    };

    return (
        <div className="w-full md:w-10/12 mx-auto px-4">
            <SectionTitle title="Update Product" subtitle="Modify product details below" />
            <div className="bg-[#F4F3F0] space-y-5 my-5 p-8">
                <div className="px-4 md:px-24">
                    <form onSubmit={handleUpdateProduct}>
                        {/* Product Name and Category */}
                        <div className="flex flex-col md:flex-row gap-10 my-5">
                            <div className="flex-1">
                                <p className="text-xl">Name</p>
                                <input
                                    className="w-full p-2"
                                    type="text"
                                    name="name"
                                    defaultValue={data.product.name}
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-xl">Category</p>
                                <select
                                    className="w-full p-2"
                                    name="category"
                                    defaultValue={data.product.category}
                                    required
                                >
                                    <option value="electronics">Electronics</option>
                                    <option value="fashion">Fashion</option>
                                    <option value="home_appliances">Home Appliances</option>
                                    <option value="beauty">Beauty</option>
                                    <option value="sports">Sports</option>
                                </select>
                            </div>
                        </div>

                        {/* Price and Color */}
                        <div className="flex flex-col md:flex-row gap-10 my-5">
                            <div className="flex-1">
                                <p className="text-xl">Price</p>
                                <input
                                    className="w-full p-2"
                                    type="number"
                                    name="price"
                                    defaultValue={data.product.price}
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-xl">Color</p>
                                <select
                                    className="w-full p-2"
                                    name="color"
                                    defaultValue={data.product.color}
                                    required
                                >
                                    <option value="red">Red</option>
                                    <option value="blue">Blue</option>
                                    <option value="green">Green</option>
                                    <option value="black">Black</option>
                                    <option value="white">White</option>
                                </select>
                            </div>
                        </div>

                        {/* Brand and Photo */}
                        <div className="flex flex-col md:flex-row gap-10 my-5">
                            <div className="flex-1">
                                <p className="text-xl">Brand</p>
                                <input
                                    className="w-full p-2"
                                    type="text"
                                    name="brand"
                                    defaultValue={data.product.brand}
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-xl">Photo</p>
                                <input
                                    className="w-full p-2"
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                />
                            </div>
                        </div>

                        {/* Details */}
                        <div className="flex flex-col gap-10 my-5">
                            <div className="flex-1">
                                <p className="text-xl">Details</p>
                                <textarea
                                    className="w-full p-2"
                                    name="details"
                                    rows="5"
                                    defaultValue={data.product.details}
                                    required
                                ></textarea>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="w-full text-center bg-teal-950 text-white py-2 text-2xl mb-5"
                            type="submit"
                        >
                            Update Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
