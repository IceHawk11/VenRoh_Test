import { useState } from "react";

const UserEmail = ({ userData, isOwnProfile, onSave = () => {} }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userEmail, setUserEmail] = useState(userData.userEmail || "");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(userEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (userEmail.length > 50) {
      setError("Email address cannot exceed 50 characters.");
      return;
    }

    setError("");
    setIsEditing(false);
    onSave({ userEmail });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(userData.userEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const handleEdit = () => {
    setCopied(false); // Reset copied state when entering edit mode
    setIsEditing(true);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">User Email Address</h2>

      <div className="flex items-center gap-3 flex-wrap justify-between">
        <p className="text-gray-800">{userData.userEmail || "N/A"}</p>
        {userData.userEmail && (
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
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="e.g. example@gmail.com"
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
              onClick={handleEdit}
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

export default UserEmail;
