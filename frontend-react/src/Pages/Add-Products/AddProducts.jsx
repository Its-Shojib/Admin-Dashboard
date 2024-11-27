import axios from 'axios';
import SectionTitle from '../../components/SectionTitle';
// import useAxiosPublic from '../../Hooks/useAxiosPublic';


const image_hosting_key = import.meta.env.VITE_IMG_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProducts = () => {

    // let axiosPublic = useAxiosPublic();

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const category = form.category.value;
        const price = form.price.value;
        const color = form.color.value;
        const brand = form.brand.value;
        const details = form.details.value;
        const imageFile = form.photo.files[0];
        console.log(imageFile)


        const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {

            const newProduct = {
                image: res?.data?.data?.display_url,
                name,
                category,
                price,
                color,
                brand,
                details
            }
            console.log(newProduct)
        }else{
            console.error('Failed to upload image')
        }

    };

    return (
        <div className="w-full md:w-10/12 mx-auto px-4">
            <SectionTitle title="Add New Product" subtitle="need more?" />
            <div className="bg-[#F4F3F0] space-y-5 my-5 p-8">
                <div className="px-4 md:px-24">
                    <form onSubmit={handleAddProduct}>
                        {/* Product Name and Category */}
                        <div className="flex flex-col md:flex-row gap-10 my-5">
                            <div className="flex-1">
                                <p className="text-xl">Name</p>
                                <input
                                    className="w-full p-2"
                                    type="text"
                                    name="name"
                                    placeholder="Enter Product Name"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-xl">Category</p>
                                <select
                                    className="w-full p-2"
                                    name="category"
                                    required
                                >
                                    <option value="">Select Category</option>
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
                                    placeholder="Enter Price"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-xl">Color</p>
                                <select
                                    className="w-full p-2"
                                    name="color"
                                    required
                                >
                                    <option value="">Select Color</option>
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
                                    placeholder="Enter Brand Name"
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
                                    required
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
                                    placeholder="Enter Product Details"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="w-full text-center bg-teal-950 text-white py-2 text-2xl mb-5"
                            type="submit"
                        >
                            Add Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;
