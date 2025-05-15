import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4 flex flex-col fixed top-0 left-0">
      <h2 className="text-xl font-bold mb-8 mt-4 px-4">Admin Dashboard</h2>
      <nav className="flex flex-col gap-1 flex-1">
        <Link
          to="/dashboard"
          className={`px-4 py-3 rounded-lg transition-colors ${
            isActive('/dashboard') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/products"
          className={`px-4 py-3 rounded-lg transition-colors ${
            isActive('/products') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'
          }`}
        >
          Manage Products
        </Link>
        <Link
          to="/orders"
          className={`px-4 py-3 rounded-lg transition-colors ${
            isActive('/orders') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'
          }`}
        >
          Manage Orders
        </Link>
        <Link
          to="/providers"
          className={`px-4 py-3 rounded-lg transition-colors ${
            isActive('/providers') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'
          }`}
        >
          Manage Partners
        </Link>
        <Link
          to="/users"
          className={`px-4 py-3 rounded-lg transition-colors ${
            isActive('/users') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'
          }`}
        >
          Manage Users
        </Link>
        <Link
          to="/add-service"
          className={`px-4 py-3 rounded-lg transition-colors ${
            isActive('/add-service') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'
          }`}
        >
          Add New Service
        </Link>
        <Link
          to="/admin/register-partners"
          className={`px-4 py-3 rounded-lg transition-colors ${
            isActive('/admin/register-partners') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'
          }`}
        >
          Verify Partners
        </Link>
        {/* ✅ New Link for Partner Documents */}
        <Link
          to="/admin/partner-documents"
          className={`px-4 py-3 rounded-lg transition-colors ${
            isActive('/admin/partner-documents') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'
          }`}
        >
          Partner Documents
        </Link>
      </nav>

      <div className="p-4 text-gray-400 text-sm">
        {/* Optional footer area */}
      </div>
    </aside>
  );
}
