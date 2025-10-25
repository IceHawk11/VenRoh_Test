import { useState } from "react";
import categories from "../categories.json"; // adjust the path if needed

const UpdatableCategorySection = ({ userData, isOwnProfile, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [category, setCategory] = useState(userData.category || "");

    const handleSave = () => {
        setIsEditing(false);
        onSave({ category });
    };

    return (
        <div className='bg-white shadow rounded-lg p-6 mb-6'>
            <h2 className='text-xl font-semibold mb-4'>Categories</h2>
            <p>{userData.category || <span className='italic text-gray-500'>No category selected</span>}</p>
            {isOwnProfile && (
                <>
                    {isEditing ? (
                        <>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='w-[200px] p-2 border rounded'
                            >
                                <option value=''>Select category</option>
                                {categories.map((range) => (
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

export default UpdatableCategorySection;
