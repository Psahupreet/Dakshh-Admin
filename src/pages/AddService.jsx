import { useState } from "react";
import axios from "axios";

export default function AddService() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
    review: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setForm(prev => ({ ...prev, images: Array.from(e.target.files) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((file) => formData.append("images", file));
      } else {
        formData.append(key, value);
      }
    });

    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Service added successfully!");
    } catch (err) {
      console.error("❌ Failed to add service:", err);
      alert("❌ Failed to add service. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Service</h1>
          <p className="text-gray-600">Fill in the details to list a new service</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Service Name *
            </label>
            <input
              id="name"
              name="name"
              placeholder="e.g., AC Repair Service"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Detailed description of the service..."
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹) *
              </label>
              <input
                id="price"
                name="price"
                type="number"
                placeholder="e.g., 599"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Rating (1-5) *
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                step="0.1"
                min="1"
                max="5"
                placeholder="e.g., 4.5"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
              Sample Review (Optional)
            </label>
            <input
              id="review"
              name="review"
              placeholder="e.g., 'Great service, highly recommended!'"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
              Service Images *
            </label>
            <input
              id="images"
              type="file"
              name="images"
              multiple
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              required
            />
            <p className="mt-1 text-xs text-gray-500">Upload multiple images to showcase your service</p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors"
            >
              Submit Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}