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
  const [activeChart, setActiveChart] = useState("annual");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="ml-64 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">📊 Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Overview of your platform statistics</p>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">Platform Overview</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveChart("monthly")}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  activeChart === "monthly" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setActiveChart("annual")}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  activeChart === "annual" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Annual
              </button>
            </div>
          </div>
          <div className="h-80">
            <StatsChart data={stats} loading={loading} period={activeChart} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color, icon, loading }) {
  const colorMap = {
    indigo: { 
      bg: "bg-indigo-50", 
      text: "text-indigo-700", 
      border: "border-indigo-100",
      progress: "bg-indigo-200"
    },
    green: { 
      bg: "bg-green-50", 
      text: "text-green-700", 
      border: "border-green-100",
      progress: "bg-green-200"
    },
    orange: { 
      bg: "bg-orange-50", 
      text: "text-orange-700", 
      border: "border-orange-100",
      progress: "bg-orange-200"
    },
    red: { 
      bg: "bg-red-50", 
      text: "text-red-700", 
      border: "border-red-100",
      progress: "bg-red-200"
    },
  };

  return (
    <div className={`${colorMap[color].bg} ${colorMap[color].border} border p-6 rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-1`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-xs font-semibold ${colorMap[color].text} uppercase tracking-wider mb-1`}>
            {label}
          </p>
          {loading ? (
            <div className="h-8 w-3/4 bg-gray-200 rounded mt-2 animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-gray-800 mt-1">
              {value.toLocaleString()}
            </p>
          )}
        </div>
        <span className="text-2xl p-3 rounded-lg bg-white shadow-sm border border-gray-100">
          {icon}
        </span>
      </div>
      <div className="mt-6">
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full ${colorMap[color].progress} rounded-full`} 
            style={{ width: `${Math.min(100, value / 10)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}