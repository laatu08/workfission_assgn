import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../services/api";
import Fuse from "fuse.js";

export default function ProductList({ refreshTrigger }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: [
        { name: "name", weight: 0.7 },
        { name: "description", weight: 0.5 },
      ],
      threshold: 0.5,
    });
  }, [products]);

  const filteredProducts = search
    ? fuse.search(search).map((result) => result.item)
    : products;

  return (
    <div>
      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
      />

      <div className="container mx-auto px-4">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">
          My Products
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 dark:border-blue-300"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex justify-center items-center h-40 text-gray-600 dark:text-gray-300 text-lg">
            No products found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="h-40 object-cover rounded mb-3"
                  />
                )}
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {p.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-3">
                  {p.description}
                </p>
                <p className="mt-auto text-blue-600 dark:text-blue-400 font-bold text-lg">
                  ${p.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
