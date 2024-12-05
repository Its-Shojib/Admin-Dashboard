import { useState, useEffect } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../components/ProductCard";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const Products = () => {
    const [active, setActive] = useState(1);
    const [totalPage, setTotalPage] = useState(null);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
    const [selectedColor, setSelectedColor] = useState("");

    let axiosPrivate = useAxiosPrivate();

    const { data: productsFetch = [], isPending: productPending, refetch:productRefetch } = useQuery({
        queryKey: ['productsFetch'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/api/products/paginate/${active}`);
            setTotalPage(res.data.total_pages)
            return res.data.products;
        }
    })

    useEffect(() => {
        if (!productPending) {
            let filtered = productsFetch;

            // Filter by search query
            if (searchQuery) {
                filtered = filtered.filter(product =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            // Filter by category
            if (selectedCategory) {
                filtered = filtered.filter(product => product.category === selectedCategory);
            }

            // Filter by price range
            filtered = filtered.filter(
                product =>
                    product.price >= priceRange.min &&
                    product.price <= priceRange.max
            );

            // Filter by color
            if (selectedColor) {
                filtered = filtered.filter(product => product.color === selectedColor);
            }

            setFilteredProducts(filtered);
        }
    }, [productsFetch, searchQuery, selectedCategory, priceRange, selectedColor, productPending]);

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

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            {
                productPending ? <div className="text-center flex justify-center items-center h-screen">
                    <span className="loading loading-spinner loading-lg"></span>
                </div> : <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Left Side: Filters */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Filters</h2>

                        {/* Search by Name */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="search">
                                Search by Name
                            </label>
                            <input
                                id="search"
                                type="text"
                                placeholder="Enter product name"
                                className="w-full p-2 border rounded"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Filter by Category */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="category">
                                Filter by Category
                            </label>
                            <select
                                id="category"
                                className="w-full p-2 border rounded"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                <option value="electronics">Electronics</option>
                                <option value="fashion">Fashion</option>
                                <option value="home_appliances">Home Appliances</option>
                                <option value="beauty">Beauty</option>
                                <option value="sports">Sports</option>
                            </select>
                        </div>

                        {/* Filter by Price Range */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="price-range">
                                Filter by Price
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    className="w-1/2 p-2 border rounded"
                                    onChange={(e) =>
                                        setPriceRange((prev) => ({
                                            ...prev,
                                            min: e.target.value ? parseFloat(e.target.value) : 0,
                                        }))
                                    }
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    className="w-1/2 p-2 border rounded"
                                    onChange={(e) =>
                                        setPriceRange((prev) => ({
                                            ...prev,
                                            max: e.target.value
                                                ? parseFloat(e.target.value)
                                                : Infinity,
                                        }))
                                    }
                                />
                            </div>
                        </div>

                        {/* Filter by Color */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="color">
                                Filter by Color
                            </label>
                            <select
                                id="color"
                                className="w-full p-2 border rounded"
                                value={selectedColor}
                                onChange={(e) => setSelectedColor(e.target.value)}
                            >
                                <option value="">All Colors</option>
                                <option value="red">Red</option>
                                <option value="blue">Blue</option>
                                <option value="green">Green</option>
                                <option value="black">Black</option>
                                <option value="white">White</option>
                            </select>
                        </div>
                    </div>

                    {/* Right Side: Products */}
                    <div className="col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:min-h-[700px]">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <ProductCard key={product?.id} product={product}/>
                                ))
                            ) : (
                                <p className="text-center col-span-3">
                                    No products match the selected filters.
                                </p>
                            )}
                        </div>
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

                </div>
            }

        </div>
    );
};

export default Products;
