import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminVerifyPartners() {
  const [partners, setPartners] = useState({
    unverified: [],
    pending: [],
    verified: [],
    declined: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  const fetchPartners = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/admin/partners-by-status", { withCredentials: true });
      setPartners(data);
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const verifyPartner = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/verify-partner/${id}`);
      fetchPartners();
    } catch (error) {
      console.error("Error verifying partner:", error);
    }
  };

  const declinePartner = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/decline-partner/${id}`);
      fetchPartners();
    } catch (error) {
      console.error("Error declining partner:", error);
    }
  };

  const renderList = (list, actions = true) => (
    <div className="space-y-3">
      {list.length === 0 ? (
        <div className="p-4 text-gray-500 text-center bg-gray-50 rounded-lg">
          No partners in this category
        </div>
      ) : (
        list.map((p) => (
          <div key={p._id} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800">{p.name}</h3>
                <p className="text-gray-600">{p.email}</p>
                <p className="text-gray-500">Phone: {p.phone}</p>
              </div>
              {actions && (
                <div className="flex gap-2 self-end">
                  <button 
                    onClick={() => verifyPartner(p._id)} 
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors shadow-sm"
                  >
                    Verify
                  </button>
                  <button 
                    onClick={() => declinePartner(p._id)} 
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors shadow-sm"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="ml-64 p-6 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="ml-64 p-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Partner Verification Dashboard</h1>
      
      <section className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2">
            <span className="bg-blue-100 p-2 rounded-full">📩</span>
            Unverified Partners (Email not verified)
          </h2>
          <div className="mt-3">
            {renderList(partners.unverified, false)}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
          <h2 className="text-xl font-bold text-amber-800 flex items-center gap-2">
            <span className="bg-amber-100 p-2 rounded-full">🕒</span>
            Pending Approval
          </h2>
          <div className="mt-3">
            {renderList(partners.pending)}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <h2 className="text-xl font-bold text-green-800 flex items-center gap-2">
            <span className="bg-green-100 p-2 rounded-full">✅</span>
            Verified Partners
          </h2>
          <div className="mt-3">
            {renderList(partners.verified, false)}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <h2 className="text-xl font-bold text-red-800 flex items-center gap-2">
            <span className="bg-red-100 p-2 rounded-full">❌</span>
            Declined Partners
          </h2>
          <div className="mt-3">
            {renderList(partners.declined, false)}
          </div>
        </div>
      </section>
    </div>
  );
}