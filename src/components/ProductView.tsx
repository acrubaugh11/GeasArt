'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

type ArtPiece = {
  id: number
  name: string
  description: string
  price: string
  category: string
  imageUrl: string
  imageAlt: string
}

export default function ProductView({
  artId,
  onClose,
}: {
  artId: string;
  onClose: () => void;
}) {
  const [artPiece, setArtPiece] = useState<ArtPiece | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${artId}`);
        const data = await res.json();
        setArtPiece(data);
      } catch (err) {
        console.error('Failed to fetch art piece:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArt();
  }, [artId]);

  if (loading) return <div className="p-4 letter-colors">Loading...</div>;
  if (!artPiece) return <div className="p-4 text-red-500">Art piece not found.</div>;

  const handleBuyNow = async (productId: string) => {
  const res = await fetch("http://localhost:3000/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  const data = await res.json();
  if (data.url) {
    window.location.href = data.url; // Redirect to Stripe or other payment processor
  }
};


  return (
    <Dialog open={true} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center px-4">
          <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 letter-colors hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <img
                src={artPiece.imageUrl}
                alt={artPiece.imageAlt}
                className="w-full rounded-lg object-cover aspect-[4/5] bg-gray-100"
              />

              <div className="flex flex-col justify-between text-center">
                {/* Top section: Name and Category */}
                <div>
                  <h2 className="text-4xl font-extrabold letter-colors">
                    {artPiece.name
                      .split(' ')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </h2>
                  <p className="mt-1 text-lg letter-colors">
                    Category:{' '}
                    {artPiece.category
                      .split(' ')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </p>
                </div>

                <div className='mt-auto'>
                  <p className="mt-10 text-base letter-colors">
                    {artPiece.description
                      .split(' ')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </p>
                </div>

                {/* Spacer to push description and price towards the bottom */}
                <div className="mt-auto">
                  <p className="mt-6 text-xl font-semibold letter-colors">
                    ${artPiece.price}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleBuyNow(artPiece.id.toString())}
                    className="mt-6 w-full rounded-md !bg-violet-300 px-4 py-2 letter-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
