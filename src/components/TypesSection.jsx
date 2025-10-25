import { useState } from "react";

const TypesSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedType, setSelectedType] = useState(userData.types || "");
  const businessTypes = [
    "Business to consumer (B2C)",
    "Direct to consumer (DTC)",
    "Business to business (B2B)",
    "Consumer to consumer (C2C)",
    "Consumer to business (C2B)",
    "Business to Government (B2G)",
    "Business to Business to Consumer (B2B2C)",
    "Consumer-to-administration (C2A)",
  ];

  const handleSave = () => {
    setIsEditing(false);
    onSave({ types: selectedType }); // Still saving to `investmentRange`
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Business Model Type(Not Compulsory)</h2>

      <p>
        {selectedType ? (
          selectedType
        ) : (
          <span className="text-gray-500 italic">No type specified.</span>
        )}
      </p>

      {isOwnProfile && (
        <>
          {isEditing ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {businessTypes.map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="businessType"
                      value={type}
                      checked={selectedType === type}
                      onChange={() => setSelectedType(type)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={handleSave}
                className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
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

export default TypesSection;
