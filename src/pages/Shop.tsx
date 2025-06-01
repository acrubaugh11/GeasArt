import Navbar from "../components/Navbar";
import { useEffect, useState } from 'react';
import ProductView from '../components/ProductView';

type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category: string;
  createdAt: string;
};

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="mainbg w-screen">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h1 className="text-center letter-colors font-gilda !text-6xl">Art Pieces</h1>
          <div className="flex justify-center">
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 max-w-4xl w-full xl:gap-x-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedProductId(product.id.toString())}
                >
                  <img
                    src={product.imageUrl}
                    alt={'Error'}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-120"
                  />
                  <div className="mt-4 !letter-colors justify-between">
                    <div>
                      <h3 className="text-sm !letter-colors font-gilda">
                        <span className="absolute inset-0 !letter-colors" />
                        {product.name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                      </h3>
                    </div>
                    <p className="text-lg letter-colors font-gilda">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 👇 ProductView Dialog */}
      {selectedProductId && (
        <ProductView
          artId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </>
  );
}
