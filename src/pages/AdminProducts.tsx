import Navbar from "../components/Navbar"
import art8 from '../assets/art8.png'
import { useEffect, useState } from 'react';
import AdminNavbar from "../components/AdminNavbar";
import { useNavigate } from 'react-router-dom';
import ProductView from '../components/ProductView';  // import the dialog component
import AdminProductView from "../components/AdminProductView";

type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category: string;
  createdAt: string;
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);  // track selected product
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  

  useEffect(() => {
    fetch('http://localhost:3000/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);

  return (
    <>
      <div className="pl-6 pr-8">
        <AdminNavbar />
      </div>

      <div className="mainbg w-screen">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h1 className="text-center letter-colors font-gilda !text-6xl">Art Pieces</h1>
          <div className="flex justify-center">
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 max-w-4xl w-full xl:gap-x-8">

              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative cursor-pointer"  // make clickable
                  onClick={() => setSelectedProductId(product.id.toString())}  // open dialog
                >
                  <img
                    src={product.imageUrl}
                    alt={'Error'}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-120"
                  />
                  <div className="mt-4 !letter-colors justify-between">
                    <div>
                      <h3 className="text-sm !letter-colors font-gilda">
                        <span aria-hidden="true" className="absolute inset-0 !letter-colors" />
                        {product.name
                          .split(" ")
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </h3>
                    </div>
                    <p className="text-lg letter-colors font-gilda">${product.price}</p>
                  </div>
                </div>
              ))}

              {/* Extra box for "Add New Product" */}
              <div className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer hover:bg-gray-300">
                <button
                  onClick={() => {
                    navigate('/art-form');
                  }}
                  className="px-6 py-4 !text-2xl font-semibold letter-colors font-gilda hover:text-indigo-800 !rounded-md"
                >
                  + Add New Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ProductView Dialog */}
      {selectedProductId && (
  <AdminProductView
    artId={selectedProductId}
    onClose={() => setSelectedProductId(null)}
    onUpdate={(updatedArt) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedArt.id ? updatedArt as Product : p))
      );
    }}
    onDelete={(deletedId) => {
      setProducts((prev) => prev.filter((p) => p.id !== deletedId));
      setSelectedProductId(null); // close dialog after delete
    }}
  />
)}

    </>
  );
}
