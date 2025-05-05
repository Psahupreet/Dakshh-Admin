// Dashboard.js
import { useEffect, useState } from "react";
import axios from "axios";
import StatsChart from "../components/StatsChart";

export default function Dashboard() {
  const [stats, setStats] = useState({ 
    products: 0, 
    users: 0, 
    orders: 0, 
    partners: 0 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard/stats")
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load dashboard stats", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">📊 Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your platform statistics</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Services" 
          value={stats.products} 
          color="indigo" 
          icon="🛠️"
          loading={loading}
        />
        <StatCard 
          label="Users" 
          value={stats.users} 
          color="green" 
          icon="👥"
          loading={loading}
        />
        <StatCard 
          label="Orders" 
          value={stats.orders} 
          color="orange" 
          icon="📦"
          loading={loading}
        />
        <StatCard 
          label="Providers" 
          value={stats.partners} 
          color="red" 
          icon="👨‍🔧"
          loading={loading}
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Platform Overview</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              Monthly
            </button>
            <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg transition-colors">
              Annual
            </button>
          </div>
        </div>
        <div className="h-80">
          <StatsChart data={stats} loading={loading} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color, icon, loading }) {
  const colorMap = {
    indigo: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-100" },
    green: { bg: "bg-green-50", text: "text-green-700", border: "border-green-100" },
    orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-100" },
    red: { bg: "bg-red-50", text: "text-red-700", border: "border-red-100" },
  };

  return (
    <div className={`${colorMap[color].bg} ${colorMap[color].border} border p-5 rounded-xl shadow-sm transition-all hover:shadow-md`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm font-medium ${colorMap[color].text} uppercase tracking-wider`}>
            {label}
          </p>
          {loading ? (
            <div className="h-8 w-3/4 bg-gray-200 rounded mt-2 animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
          )}
        </div>
        <span className="text-2xl p-2 rounded-lg bg-white shadow-sm">
          {icon}
        </span>
      </div>
      <div className="mt-4">
        <div className={`h-1 w-full ${colorMap[color].bg} rounded-full`}>
          <div 
            className={`h-1 ${colorMap[color].border.replace('border', 'bg')} rounded-full`} 
            style={{ width: `${Math.min(100, value / 10)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}