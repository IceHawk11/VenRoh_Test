import { useState, useEffect } from "react";

const TotalInvested = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [totalInvestment, setInvestmentAmount] = useState(userData.totalInvestment || "");
  const [status, setStatus] = useState(userData.investmentStatus || "Not Allotted");
  const [hasLocalChanges, setHasLocalChanges] = useState(false);

  // Prevent userData from overwriting local state during editing or after local changes
  useEffect(() => {
    if (!isEditing && !hasLocalChanges) {
      setInvestmentAmount(userData.totalInvestment || "");
      setStatus(userData.investmentStatus || "Not Allotted");
    }
  }, [userData, isEditing, hasLocalChanges]);

  const handleSave = () => {
    if (totalInvestment && totalInvestment !== userData.totalInvestment) {
      setStatus("Pending"); // Set local status
      setHasLocalChanges(true); // Prevent useEffect from overriding
      onSave({
        totalInvestment,
        investmentStatus: "Pending", // Also send status to backend/parent
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
      <h2 className="text-xl font-semibold mb-4">Total Investment</h2>
      
      <p>
        <strong>Amount:</strong>{" "}
        {totalInvestment ? `₹ ${totalInvestment}` : (
          <span className="text-gray-500 italic">No investment specified.</span>
        )}
      </p>
      
      <p className="mt-1">
        <strong>Status:</strong>{" "}
        <span className={`inline-block px-2 py-1 text-sm rounded ${getStatusBadgeClass(status)}`}>
          {status}
        </span>
      </p>

      {isOwnProfile && (
        <>
          {isEditing ? (
            <>
              <input
                type="number"
                value={totalInvestment}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                placeholder="Enter investment amount in INR"
                className="mt-4 border rounded p-2 w-full"
              />
              <button
                onClick={handleSave}
                className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
              >
                Save
              </button>
            </>
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

export default TotalInvested;