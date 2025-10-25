import { useState } from "react";

const FoundedYearSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [foundedYear, setFoundedYear] = useState(userData.foundedYear || "");

	const handleSave = () => {
		setIsEditing(false);
		onSave({ foundedYear });
	};

	// Generate years from 1900 to current year
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i).reverse();

	return (
		<div className='bg-white shadow rounded-lg p-6 mb-6'>
			<h2 className='text-xl font-semibold mb-4'>Founded Year</h2>
			<p>{userData.foundedYear}</p>
			{isOwnProfile && (
				<>
					{isEditing ? (
						<>
							<select
								value={foundedYear}
								onChange={(e) => setFoundedYear(e.target.value)}
								className='w-[150px] p-2 border rounded'
							>
								<option value=''>Select year</option>
								{years.map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
							</select>
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

export default FoundedYearSection;
