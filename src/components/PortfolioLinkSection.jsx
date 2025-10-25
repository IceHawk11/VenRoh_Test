import { useState } from "react";

const PortfolioLinkSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [portfolio, setPortfolio] = useState(userData.portfolio || "");

  const handleSave = () => {
    setIsEditing(false);
    onSave({ portfolio }); // send updated portfolio under correct key
  };

  return (
    <div className='bg-white shadow rounded-lg p-6 mb-6'>
      <h2 className='text-xl font-semibold mb-4'>Portfolio Link</h2>
      
      {/* Show link or placeholder */}
      {!isEditing && (
        portfolio ? (
          <p>
            <a 
              href={portfolio.startsWith("http") ? portfolio : `https://${portfolio}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {portfolio}
            </a>
          </p>
        ) : (
          <p className="text-gray-500 italic">No portfolio link provided.</p>
        )
      )}

      {isOwnProfile && (
        <>
          {isEditing ? (
            <>
              <textarea
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
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

export default PortfolioLinkSection;
