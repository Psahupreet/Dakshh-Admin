import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); // must be admin token
        const res = await axios.get("http://localhost:5000/api/orders/AllOrders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("❌ You are not authorized or something went wrong");
      }
      finally {
        setIsLoading(false);
      }
    };
   
    fetchOrders();
  }, []);
  
 
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Manage Orders</h2>
        </div>

        {isLoading ? (
          <div className="p-6">Loading...</div>
        ) : error ? (
          <div className="p-6 text-red-500">{error}</div>
        ) : orders.length === 0 ? (
          <div className="p-6 text-gray-600">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 text-sm">{order._id}</td>
                    <td className="px-6 py-4 text-sm">{order.user?.name || "Guest"}</td>
                    <td className="px-6 py-4 text-sm">₹{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
