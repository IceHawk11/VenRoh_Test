import { useState } from "react";

const WebsiteLinkSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [website, setWebsite] = useState(userData.website || "");

  const handleSave = () => {
    setIsEditing(false);
    onSave({ website }); // ✅ Use correct key
  };

  return (
    <div className='bg-white shadow rounded-lg p-6 mb-6'>
      <h2 className='text-xl font-semibold mb-4'>Website Link</h2>

      {/* Display link when not editing */}
      {!isEditing && (
        website ? (
          <p>
            <a
              href={website.startsWith("http") ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {website}
            </a>
          </p>
        ) : (
          <p className="text-gray-500 italic">No website link provided.</p>
        )
      )}

      {/* Show editing interface if it's your profile */}
      {isOwnProfile && (
        <>
          {isEditing ? (
            <>
              <textarea
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className='w-full p-2 border rounded'
                rows='1'
              />
              <button
                onClick={handleSave}
                className='mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300'
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className='mt-2 text-primary hover:text-primary-dark transition duration-300'
            >
              Edit
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default WebsiteLinkSection;
