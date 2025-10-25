import { useState, useEffect } from "react";

const TotalCompaniesInvested = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [companies, setCompanies] = useState(userData.companiesInvested || []);
  const [status, setStatus] = useState(userData.companiesStatus || "Not Allotted");
  const [hasLocalChanges, setHasLocalChanges] = useState(false);
  const [newCompany, setNewCompany] = useState("");

  // Prevent userData from overwriting local state during editing or after local changes
  useEffect(() => {
    if (!isEditing && !hasLocalChanges) {
      setCompanies(userData.companiesInvested || []);
      setStatus(userData.companiesStatus || "Not Allotted");
    }
  }, [userData, isEditing, hasLocalChanges]);

  const handleAddCompany = () => {
    if (newCompany.trim() && !companies.includes(newCompany.trim())) {
      setCompanies([...companies, newCompany.trim()]);
      setNewCompany("");
    }
  };

  const handleRemoveCompany = (index) => {
    setCompanies(companies.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddCompany();
    }
  };

  const handleSave = () => {
    // Check if companies list has changed
    const originalCompanies = userData.companiesInvested || [];
    const hasChanges = companies.length !== originalCompanies.length || 
      companies.some((company, index) => company !== originalCompanies[index]);

    if (hasChanges) {
      setStatus("Pending"); // Set local status
      setHasLocalChanges(true); // Prevent useEffect from overriding
      onSave({
        companiesInvested: companies,
        companiesStatus: "Pending", // Also send status to backend/parent
      });
    }
    setIsEditing(false);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Not Allotted":
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Companies Invested In</h2>
      
      <div className="mb-3">
        <strong>Companies:</strong>
        {companies.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {companies.map((company, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {company}
                {isEditing && (
                  <button
                    onClick={() => handleRemoveCompany(index)}
                    className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-500 italic ml-2">No companies specified.</span>
        )}
      </div>
      
      <p className="mt-3">
        <strong>Status:</strong>{" "}
        <span className={`inline-block px-2 py-1 text-sm rounded ${getStatusBadgeClass(status)}`}>
          {status}
        </span>
      </p>

      {isOwnProfile && (
        <>
          {isEditing ? (
            <div className="mt-4">
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter company name"
                  className="flex-1 border rounded p-2"
                />
                <button
                  onClick={handleAddCompany}
                  disabled={!newCompany.trim()}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-300"
                >
                  Add
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setCompanies(userData.companiesInvested || []);
                    setNewCompany("");
                  }}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // Only show edit button when status is "Not Allotted" or "Verified"
            // Hide when status is "Pending" or "Rejected"
            (status === "Not Allotted" || status === "Verified") && (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 text-primary hover:text-primary-dark transition duration-300"
              >
                Edit
              </button>
            )
          )}
        </>
      )}
    </div>
  );
};

export default TotalCompaniesInvested;