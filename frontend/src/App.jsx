import { useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { Toaster } from 'react-hot-toast';

function App() {
  const [tab, setTab] = useState("submit");
  const [refresh, setRefresh] = useState(0);
  const triggerRefresh = () => setRefresh((prev) => prev + 1);

  const [isDark, setIsDark] = useState(false);
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <Toaster position="top-right" />
      <header className="bg-white dark:bg-gray-800 shadow mb-6 transition-colors">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Mini E-Commerce</h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-4 items-center">
            <button
              onClick={() => setTab("submit")}
              className={`px-4 py-2 rounded transition ${
                tab === "submit"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-200 dark:hover:bg-gray-700"
              }`}
            >
              Product Submission
            </button>
            <button
              onClick={() => setTab("products")}
              className={`px-4 py-2 rounded transition ${
                tab === "products"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-200 dark:hover:bg-gray-700"
              }`}
            >
              My Products
            </button>
            <button onClick={toggleDarkMode} className="px-4 py-2 rounded hover:bg-blue-200 dark:hover:bg-gray-700 transition">
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                // Close Icon
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                // Hamburger Icon
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden px-4 pb-4 space-y-2">
            <button
              onClick={() => { setTab("submit"); setIsMenuOpen(false); }}
              className={`block w-full text-left px-4 py-2 rounded transition ${
                tab === "submit"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-200 dark:hover:bg-gray-700"
              }`}
            >
              Product Submission
            </button>
            <button
              onClick={() => { setTab("products"); setIsMenuOpen(false); }}
              className={`block w-full text-left px-4 py-2 rounded transition ${
                tab === "products"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-200 dark:hover:bg-gray-700"
              }`}
            >
              My Products
            </button>
            <button
              onClick={() => { toggleDarkMode(); setIsMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 rounded hover:bg-blue-200 dark:hover:bg-gray-700 transition"
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
          </nav>
        )}
      </header>

      {tab === "submit" && <ProductForm onProductAdded={triggerRefresh} />}
      {tab === "products" && <ProductList refreshTrigger={refresh} />}
    </div>
  );
}

export default App;
