import { useState } from "react";

const MultipleCategorySection = ({ userData, isOwnProfile, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState(
        Array.isArray(userData.category)
            ? userData.category
            : userData.category
            ? [userData.category]
            : []
    );

    const categories = [
        "AI & Machine Learning",
        "Aerospace",
        "Maritime and Defense Tech",
        "Agri Business",
        "AgriTech Agriculture",
        "Battery Tech",
        "Door Delivery of Milk & Dairy Products",
        "Drone Procurement & Leasing",
        "E-Commerce",
        "E-Learning",
    ];

    const handleCheckboxChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else if (selectedCategories.length < 5) {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleSave = () => {
        setIsEditing(false);
        onSave({ category: selectedCategories });
    };

    return (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <p>{selectedCategories.length ? selectedCategories.join(", ") : "No categories selected"}</p>

            {isOwnProfile && (
                <>
                    {isEditing ? (
                        <>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {categories.map((cat) => (
                                    <label key={cat} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            value={cat}
                                            checked={selectedCategories.includes(cat)}
                                            onChange={() => handleCheckboxChange(cat)}
                                            disabled={
                                                !selectedCategories.includes(cat) &&
                                                selectedCategories.length >= 5
                                            }
                                        />
                                        <span>{cat}</span>
                                    </label>
                                ))}
                            </div>
                            <button
                                onClick={handleSave}
                                className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
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

export default MultipleCategorySection;
