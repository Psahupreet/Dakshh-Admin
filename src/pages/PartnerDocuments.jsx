import { useEffect, useState } from "react";
import axios from "axios";

export default function PartnerDocuments() {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:5000/api/admin/partner-documents", { withCredentials: true })
      .then((res) => setPartners(res.data))
      .catch((err) => {
        console.error("Error fetching documents:", err);
        alert("Failed to fetch documents");
      })
      .finally(() => setIsLoading(false));
  };

 const handleVerification = async (partnerId) => {
  try {
    const Token = localStorage.getItem("adminToken"); // or your token key
    await axios.post(
      `http://localhost:5000/api/admin/partners/${partnerId}/verify`,
      {},
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    alert("Partner verified");
    // Optionally refetch the updated data
  } catch (err) {
    console.error("Failed to verify partner", err);
    alert("Verification failed");
  }
};

  return (
    <div className="ml-64 p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Partner Documents
        </h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : partners.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v16a2 2 0 01-2 2z" />
          </svg>
          <p className="mt-4 text-gray-500">No partner documents submitted yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {partners.map((partner) => (
            <div key={partner._id} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {partner.name} ({partner.email})
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm text-gray-700 mb-4">
                {Object.entries(partner.documents).map(([key, url]) => (
                  url && (
                    <div key={key} className="flex flex-col">
                      <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                      <a href={`http://localhost:5000/${url}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline truncate">
                        View PDF
                      </a>
                    </div>
                  )
                ))}
              </div>

              <div className="flex items-center gap-4 mt-2">
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  (partner.verificationStatus ?? "pending") === "verified" ? "bg-green-100 text-green-800" :
                  (partner.verificationStatus ?? "pending") === "declined" ? "bg-red-100 text-red-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  Status: {partner.verificationStatus ?? "pending"}
                </span>

                {(partner.verificationStatus ?? "pending") === "pending" && (
                      <>
                        <button
                          onClick={() => handleVerification(partner._id, "verify")}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => handleVerification(partner._id, "decline")}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Decline
                        </button>
                      </>
                    )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
