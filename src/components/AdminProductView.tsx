'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

type ArtPiece = {
  id: number
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  imageAlt: string
  createdAt: string;
}

export default function AdminProductView({
  artId,
  onClose,
  onUpdate,
  onDelete,
}: {
  artId: string;
  onClose: () => void;
  onUpdate?: (updatedArt: ArtPiece) => void;
  onDelete?: (deletedId: number) => void;
}) {
  const [artPiece, setArtPiece] = useState<ArtPiece | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const res = await fetch(`https://geasart.onrender.com/products/${artId}`);
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

  const handleUpdate = async () => {
    if (!artPiece) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not authenticated');
      return;
    }

    try {
      const response = await fetch(`https://geasart.onrender.com/products/${artPiece.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(artPiece),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Update failed');
      }

      const updatedProduct = await response.json();
      setArtPiece(updatedProduct);
      onUpdate?.(updatedProduct);
      setIsEditing(false);
      onClose();
      alert('Product updated!');
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Failed to update product');
    }
  };

  const handleChange = (field: keyof ArtPiece, value: string) => {
    setArtPiece((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

const handleDelete = async () => {
  if (!artPiece) return;

  const confirmed = confirm('Are you sure you want to delete this art piece?');
  if (!confirmed) return;

  const token = localStorage.getItem('token');
  if (!token) {
    alert('User not authenticated');
    return;
  }

  try {
    const response = await fetch(`https://geasart.onrender.com/products/${artPiece.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      alert('Product deleted successfully');
      onDelete?.(artPiece.id);
      onClose();
    } else {
      // Only try to parse JSON if content-type is JSON and there's a body
      let errorMessage = 'Delete failed';
      try {
        const error = await response.json();
        errorMessage = error.error || errorMessage;
      } catch (e) {
        // ignore JSON parse error (likely due to 204 No Content)
      }
      throw new Error(errorMessage);
    }
  } catch (err) {
    console.error('Error deleting product:', err);
    alert('Failed to delete product');
  }
};



  if (loading) return <div className="p-4 letter-colors">Loading...</div>;
  if (!artPiece) return <div className="p-4 text-red-500">Art piece not found.</div>;

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
                {isEditing ? (
                  <div className="text-left space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={artPiece.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="border p-2 rounded w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <input
                        type="text"
                        value={artPiece.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className="border p-2 rounded w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={artPiece.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        className="border p-2 rounded w-full"
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <input
                        type="text"
                        value={artPiece.price}
                        onChange={(e) => handleChange('price', e.target.value)}
                        className="border p-2 rounded w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Image URL</label>
                      <input
                        type="text"
                        value={artPiece.imageUrl}
                        onChange={(e) => handleChange('imageUrl', e.target.value)}
                        className="border p-2 rounded w-full"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-4xl font-extrabold letter-colors">{artPiece.name}</h2>
                    <p className="mt-1 text-lg letter-colors">Category: {artPiece.category}</p>
                    <p className="mt-10 text-base letter-colors">{artPiece.description}</p>
                    <p className="mt-6 text-xl font-semibold letter-colors">${artPiece.price}</p>
                  </>
                )}

                <div className="mt-6 flex gap-4 justify-center">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        className="rounded-md !bg-violet-300 px-4 py-2 letter-colors font-semibold hover:bg-green-600"
                        onClick={handleUpdate}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="rounded-md !bg-violet-300 px-4 py-2 letter-colors font-semibold hover:bg-gray-500"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="rounded-md !bg-violet-300 px-4 py-2 font-semibold letter-colors hover:bg-yellow-500"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    type="button"
                    className="rounded-md !bg-violet-300 px-4 py-2 font-semibold letter-colors hover:bg-red-600"
                    onClick={handleDelete}
                  >
                    Delete
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
