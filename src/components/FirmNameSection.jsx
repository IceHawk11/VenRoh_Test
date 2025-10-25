import { useState } from "react";

const FirmNameSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [startUpName, setStartUpName] = useState(userData.startUpName || "");
  const [document, setDocument] = useState(null);
  const [status, setStatus] = useState(userData.nameVerificationStatus || "not-submitted");

  let title = "";
  if (userData.headline === "Idea") title = "Idea Name";
  else if (userData.headline === "Start-Up") title = "Start-Up Name";
  else if (userData.headline === "Investor") title = "Organization Name";

  const handleSave = () => {
    setIsEditing(false);
    setStatus("pending");
    onSave({ startUpName, nameVerificationStatus: "pending", document });
  };

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-lg font-medium">{userData.startUpName || startUpName}</p>

      {/* Status Bar */}
      {status !== "not-submitted" && (
        <div className="mt-4">
          <div className="text-sm font-medium mb-1">Verification Status</div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`
                h-full transition-all duration-500
                ${status === "pending" ? "w-1/2 bg-yellow-500" : ""}
                ${status === "verified" ? "w-full bg-green-500" : ""}
              `}
            ></div>
          </div>
          <p className="mt-1 text-xs text-gray-600">
            {status === "pending"
              ? "Pending Verification"
              : status === "verified"
              ? "Verified"
              : ""}
          </p>
        </div>
      )}

      {/* Editable Section */}
      {isOwnProfile && (
        <>
          {isEditing ? (
            <>
              <textarea
                value={startUpName}
                onChange={(e) => setStartUpName(e.target.value)}
                className="w-full p-2 border rounded mt-4"
                rows="1"
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-2 block"
              />
              <button
                onClick={handleSave}
                className="mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
              >
                Save
              </button>
            </>
          ) : (
            <>
              {(!userData.startUpName || status === "verified") ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 text-primary hover:text-primary-dark transition duration-300"
                >
                  Edit
                </button>
              ) : (
                <p className="mt-4 text-gray-500 italic">
                  Editing disabled until verification is complete.
                </p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FirmNameSection;
