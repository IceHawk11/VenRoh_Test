

const StartUpDescription = ({ userData}) => {

    return (
        <div className='bg-white shadow rounded-lg p-6 mb-6'>
            <h2 className='text-xl font-semibold mb-4'>Description</h2>
            <p>{userData.startUpDescription}</p>
        </div>
    );
};
export default StartUpDescription;