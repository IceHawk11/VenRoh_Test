import { useState } from "react";

const NumberOfEmployees = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [numberOfEmployees, setNumberOfEmployees] = useState(userData.numberOfEmployees || "");

	const handleSave = () => {
		setIsEditing(false);
		onSave({ numberOfEmployees });
	};

	const employeeRanges = [
		"1-10",
		"11-50",
		"51-200",
		"201-500",
		"501-1000",
		"1001-5000",
		"5001-10000",
		"10000+",
	];

	return (
		<div className='bg-white shadow rounded-lg p-6 mb-6'>
			<h2 className='text-xl font-semibold mb-4'>Number of Employees</h2>
			<p>{userData.numberOfEmployees}</p>
			{isOwnProfile && (
				<>
					{isEditing ? (
						<>
							<select
								value={numberOfEmployees}
								onChange={(e) => setNumberOfEmployees(e.target.value)}
								className='w-[200px] p-2 border rounded'
							>
								<option value=''>Select range</option>
								{employeeRanges.map((range) => (
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

export default NumberOfEmployees;
