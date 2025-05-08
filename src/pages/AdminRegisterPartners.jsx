// AdminRegisterPartners.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminRegisterPartners() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/unverified-partners").then((res) => {
      setPartners(res.data);
    });
  }, []);

  const handleVerify = async (id) => {
    await axios.put(`http://localhost:5000/api/admin/verify-partner/${id}`);
    setPartners(partners.filter(p => p._id !== id));
  };

  const handleDecline = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/decline-partner/${id}`);
    setPartners(partners.filter(p => p._id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Unverified Partners</h2>
      {partners.map((partner) => (
        <div key={partner._id} className="border p-4 mb-4 rounded shadow">
          <p><strong>Name:</strong> {partner.name}</p>
          <p><strong>Email:</strong> {partner.email}</p>
          <p><strong>Phone:</strong> {partner.phone}</p>
          <div className="mt-2 flex gap-2">
            <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={() => handleVerify(partner._id)}>Verify</button>
            <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDecline(partner._id)}>Decline</button>
          </div>
        </div>
      ))}
    </div>
  );
}
