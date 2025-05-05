import { Link, useNavigate, useLocation } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  // Check if current route matches the link
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center border-b border-gray-700 shadow-lg">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Daksh Admin
      </h1>
      <div className="flex items-center gap-8">
        <Link 
          to="/dashboard" 
          className={`py-2 px-1 font-medium transition-colors ${isActive('/dashboard') ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300 hover:text-white'}`}
        >
          Dashboard
        </Link>
        <Link 
          to="/products" 
          className={`py-2 px-1 font-medium transition-colors ${isActive('/products') ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300 hover:text-white'}`}
        >
          Products
        </Link>
        <Link 
          to="/orders" 
          className={`py-2 px-1 font-medium transition-colors ${isActive('/orders') ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300 hover:text-white'}`}
        >
          Orders
        </Link>
        <Link 
          to="/providers" 
          className={`py-2 px-1 font-medium transition-colors ${isActive('/providers') ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300 hover:text-white'}`}
        >
          Providers
        </Link>
        <Link 
          to="/users" 
          className={`py-2 px-1 font-medium transition-colors ${isActive('/users') ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300 hover:text-white'}`}
        >
          Users
        </Link>
        <button 
          onClick={handleLogout} 
          className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
          Logout
        </button>
      </div>
    </nav>
  );
}