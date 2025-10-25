import { useState } from "react";

const AddressSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState(userData.address || "");
  const [error, setError] = useState("");

  const wordCount = address.trim().split(/\s+/).filter(Boolean).length;

  const handleSave = () => {
    if (wordCount > 50) {
      setError("Maximum word limit is 150.");
      return;
    }

    setIsEditing(false);
    setError("");
    onSave({ address });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Address</h2>

      <p>{userData.address}</p>

      {isOwnProfile && (
        <>
          {isEditing ? (
            <>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded"
                rows="4"
              />
              <div className="text-sm mt-1 text-gray-500">
                Word Count: {wordCount}/50
              </div>
              {error && (
                <p className="text-sm text-red-500 mt-1">{error}</p>
              )}
              <button
                onClick={handleSave}
                className="mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-2 text-primary hover:text-primary-dark transition duration-300"
            >
              Edit
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AddressSection;
