import { useState } from "react";

const AgeSection = ({ userData, isOwnProfile, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [age, setAge] = useState(userData.age || "");

    const handleSave = () => {
        setIsEditing(false);
        onSave({ age });
    };
    return (
        <div className='bg-white shadow rounded-lg p-6 mb-6'>
            <h2 className='text-xl font-semibold mb-4'>Age</h2>
            <p>{userData.age}</p>
            {isOwnProfile && (
                <>
                    {isEditing ? (
                        <>
                            <textarea
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
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
export default AgeSection;