import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ArtForm() {
    const navigator = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const token = localStorage.getItem('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

      const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        if (imageFile) {
        data.append('image', imageFile); // This key must match `upload.single('image')` in backend
      }

try {
      const response = await fetch('https://geasart.onrender.com/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to create product');
      }

      alert('Product created successfully!');
      navigator('/admin-products')
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-10 w-full max-w-xl p-10 bg-white rounded shadow">
        <h2 className="text-xl font-semibold text-gray-900">Create New Art Piece</h2>
        <p className="text-sm text-gray-600">Be sure to input all fields.</p>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-indigo-600"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-900">Description</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            required
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-indigo-600"
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-900">Price</label>
          <input
            id="price"
            name="price"
            type="float"
            step="0.01"
            required
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-indigo-600"
          />
        </div>

        {/* Image URL */}
        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-900">Image</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            required
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-indigo-600"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-900">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            required
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-indigo-600"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-x-4">
            <Link to={'/admin-products'}>
                <button type="button" className="text-sm font-medium letter-colors hover:underline">
                    Cancel
                </button>
            </Link>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm letter-colors hover:bg-indigo-500 hover:underline"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
