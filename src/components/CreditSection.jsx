import { useState } from "react";

const CreditSection = ({ userData, isOwnProfile, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [credit, setCredit] = useState(userData.credit || "");

    const handleSave = () => {
        setIsEditing(false);
        onSave({ credit });
    };
    return (
        <div className='bg-white shadow rounded-lg p-6 mb-6'>
            <h2 className='text-xl font-semibold mb-4'>Credits</h2>
            <p>{userData.credit}</p>
            {isOwnProfile && (
                <>
                    {isEditing ? (
                        <>
                            <textarea
                                value={credit}
                                onChange={(e) => setCredit(e.target.value)}
                                className='w-full p-2 border rounded'
                                rows='1'
                            />
                            <button
                                onClick={handleSave}
                                className='mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark 
                                transition duration-300'
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className='mt-2 text-primary hover:text-primary-dark transition duration-300'
                            >
                                Edit
                            </button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};
export default CreditSection;