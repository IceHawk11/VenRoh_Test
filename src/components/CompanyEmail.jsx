import { useState } from "react";

const CompanyEmail = ({ userData, isOwnProfile, onSave = () => {} }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [companyEmail, setCompanyEmail] = useState(userData.companyEmail || "");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(companyEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (companyEmail.length > 50) {
      setError("Email address cannot exceed 50 characters.");
      return;
    }

    setIsEditing(false);
    setError("");
    onSave({ companyEmail });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(userData.companyEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Company Email Address</h2>

      <div className="flex items-center gap-3 flex-wrap justify-between">
        <p className="text-gray-800">{userData.companyEmail || "N/A"}</p>
        {userData.companyEmail && (
          <button
            onClick={handleCopy}
            className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition duration-300"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>

      {isOwnProfile && (
        <>
          {isEditing ? (
            <div className="flex flex-col gap-2 mt-4">
              <input
                type="email"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="e.g. company@example.com"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                onClick={handleSave}
                className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
              >
                Save
              </button>
            </div>
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

export default CompanyEmail;
