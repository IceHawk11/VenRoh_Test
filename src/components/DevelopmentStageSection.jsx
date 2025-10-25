import { useState } from "react";

const DevelopmentStageSection = ({ userData, isOwnProfile, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentStage, setCurrentStage] = useState(userData.currentstage || "");

    const handleSave = () => {
        setIsEditing(false);
        onSave({ currentStage });
    };

    const stages = [
        "Concept Only",
        "Research & Planning",
        "Early Prototype"
    ];

    return (
        <div className='bg-white shadow rounded-lg p-6 mb-6'>
            <h2 className='text-xl font-semibold mb-4'>Development Stage</h2>
            <p>{userData.currentStage}</p>
            {isOwnProfile && (
                <>
                    {isEditing ? (
                        <>
                            <select
                                value={currentStage}
                                onChange={(e) => setCurrentStage(e.target.value)}
                                className='w-[200px] p-2 border rounded'
                            >
                                <option value=''>Select stage</option>
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

export default DevelopmentStageSection;
