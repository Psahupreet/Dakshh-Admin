import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageOrders() {
  const [ordersByUser, setOrdersByUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setError("❌ Admin token missing. Please log in again.");
        setIsLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/orders/AllOrders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const grouped = {};
        res.data.forEach((order) => {
          const userName = order.user?.name || "Guest";
          if (!grouped[userName]) grouped[userName] = [];
          grouped[userName].push(order);
        });

        for (const user in grouped) {
          grouped[user].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setOrdersByUser(grouped);
      } catch (error) {
        console.error("Error fetching orders:", error);
        if (error.response?.status === 401) {
          setError("❌ Unauthorized. Please log in as an admin.");
        } else {
          setError("❌ Something went wrong while fetching orders.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="ml-64 max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Orders</h2>

      {isLoading ? (
        <div className="text-lg">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-lg">{error}</div>
      ) : Object.keys(ordersByUser).length === 0 ? (
        <div className="text-gray-600">No orders found.</div>
      ) : (
        <div className="space-y-6">
          {Object.entries(ordersByUser).map(([userName, orders]) => (
            <div key={userName} className="bg-white shadow rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 rounded-t-xl">
                <h3 className="text-xl font-semibold text-gray-700">
                  Customer: <span className="text-blue-600">{userName}</span>
                </h3>
                <p className="text-sm text-gray-500">{orders.length} order(s)</p>
              </div>
              <div className="p-4 divide-y divide-gray-100">
                {orders.map((order) => (
                  <div key={order._id} className="py-4">
                    <div className="mb-2 flex justify-between text-sm text-gray-500">
                      <span>Order ID: {order._id}</span>
                      <span>{new Date(order.createdAt).toLocaleString()}</span>
                    </div>

                    <ul className="ml-4 space-y-1 text-gray-800">
                      {order.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between items-center text-sm border p-2 rounded-md bg-gray-50"
                        >
                          <span>
                            <strong>{item.title || item.name}</strong> × {item.quantity}
                          </span>
                          <span className="text-gray-600">₹{item.price * item.quantity}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-3">
                      <span
                        className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
