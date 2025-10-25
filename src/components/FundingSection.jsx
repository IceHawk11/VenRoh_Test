import { useState } from "react";

const FundingSection = ({ userData, isOwnProfile, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [funding, setFunding] = useState(userData.totalFunding || "");

    const handleSave = () => {
        setIsEditing(false);
        onSave({ totalFunding: funding }); // FIXED
    };

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

    return (
        <div className='bg-white shadow rounded-lg p-6 mb-6'>
            <h2 className='text-xl font-semibold mb-4'>Required Funding</h2>
            <p>{userData.totalFunding}</p>
            {isOwnProfile && (
                <>
                    {isEditing ? (
                        <>
                            <select
                                value={funding}
                                onChange={(e) => setFunding(e.target.value)}
                                className='w-[200px] p-2 border rounded'
                            >
                                <option value=''>Select range</option>
                                {stages.map((range) => (
                                    <option key={range} value={range}>
                                        {range}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleSave}
                                className='mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300'
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

export default FundingSection;

