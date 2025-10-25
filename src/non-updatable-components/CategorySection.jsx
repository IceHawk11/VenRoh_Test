

const CategorySection = ({ userData}) => {

    return (
        <div className='bg-white shadow rounded-lg p-6 mb-6'>
            <h2 className='text-xl font-semibold mb-4'>Categories</h2>
            <p>{userData.category}</p>
        </div>
    );
};

export default CategorySection;
