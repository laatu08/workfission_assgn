import { useState } from "react";
import { addProduct } from "../services/api";
import toast from 'react-hot-toast';

export default function ProductForm({ onProductAdded }) {
  const [form, setForm] = useState({ name: "", price: "", description: "", image_url: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addProduct(form);
      toast.success('Product added successfully!');
      onProductAdded();
      setForm({ name: "", price: "", description: "", image_url: "" });
    } catch (error) {
      toast.error('Failed to add product.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow rounded p-6 max-w-lg mx-auto space-y-4 transition-colors">
      <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Add a New Product</h2>

      <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name"
        className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-900 dark:border-gray-700 dark:text-white" required />

      <input name="price" value={form.price} onChange={handleChange} placeholder="Price"
        className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-900 dark:border-gray-700 dark:text-white" required />

      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description"
        className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-900 dark:border-gray-700 dark:text-white" required></textarea>

      <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="Image URL (optional)"
        className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-900 dark:border-gray-700 dark:text-white" />

      <button disabled={loading} className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition disabled:opacity-50">
        {loading ? 'Submitting...' : 'Submit Product'}
      </button>
    </form>
  );
}
