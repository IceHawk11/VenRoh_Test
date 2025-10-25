import { useState } from "react";

const AboutSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(userData.about || "");
  const [error, setError] = useState("");

  const wordCount = about.trim().split(/\s+/).filter(Boolean).length;

  const handleSave = () => {
    if (wordCount > 150) {
      setError("Maximum word limit is 150.");
      return;
    }

    setIsEditing(false);
    setError("");
    onSave({ about });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">About</h2>

      <p>{userData.about}</p>

      {isOwnProfile && (
        <>
          {isEditing ? (
            <>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full p-2 border rounded"
                rows="4"
              />
              <div className="text-sm mt-1 text-gray-500">
                Word Count: {wordCount}/150
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

export default AboutSection;
