

const AgeSection = ({ userData }) => {

    return (
        <div className='bg-white shadow rounded-lg p-6 mb-6'>
            <h2 className='text-xl font-semibold mb-4'>Age</h2>
            <p>{userData.age}</p>

        </div>
    );
};
export default AgeSection;