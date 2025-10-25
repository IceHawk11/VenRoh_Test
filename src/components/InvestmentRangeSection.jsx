import { useState } from "react";

const InvestmentRangeSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRanges, setSelectedRanges] = useState(
    Array.isArray(userData.investmentRange)
      ? userData.investmentRange
      : userData.investmentRange
      ? [userData.investmentRange]
      : []
  );

  const stages = [
    "<10 lakh",
    "10 lakh",
    "20 lakh",
    "50 lakh",
    "1 Cr",
    "2 Cr",
    "5 Cr",
    "10 Cr",
    ">10 Cr",
  ];

  const handleCheckboxChange = (range) => {
    if (selectedRanges.includes(range)) {
      setSelectedRanges(selectedRanges.filter((r) => r !== range));
    } else if (selectedRanges.length < 2) {
      setSelectedRanges([...selectedRanges, range]);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave({ investmentRange: selectedRanges });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Investment Range</h2>

      <p>
        {selectedRanges.length > 0
          ? selectedRanges.join(", ")
          : <span className="text-gray-500 italic">No investment range specified.</span>}
      </p>

      {isOwnProfile && (
        <>
          {isEditing ? (
            <>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {stages.map((range) => (
                  <label key={range} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={range}
                      checked={selectedRanges.includes(range)}
                      onChange={() => handleCheckboxChange(range)}
                      disabled={
                        !selectedRanges.includes(range) &&
                        selectedRanges.length >= 5
                      }
                    />
                    <span>{range}</span>
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

export default InvestmentRangeSection;
