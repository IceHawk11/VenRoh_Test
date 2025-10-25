import { useState } from "react";
import { Camera } from "lucide-react";

const WorkSection = ({ userData, onSave, isOwnProfile }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedData, setEditedData] = useState({});

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setEditedData((prev) => ({
					...prev,
					[event.target.name]: reader.result,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSave = () => {
		onSave(editedData);
		setIsEditing(false);
	};

	const workFile = editedData.work || userData.work;

	return (
		<div className="bg-white shadow rounded-lg mb-6">
			<div className="p-4">
				<div className="relative mt-5 mb-4">
					<h2 className="text-xl font-semibold mb-4">
						Presentation Document
					</h2>

					{workFile && workFile.startsWith("data:image") ? (
						<img
							className="w-32 h-32 mx-auto object-cover"
							src={workFile}
							alt="Uploaded work"
						/>
					) : (
						<img
							className="w-32 h-32 mx-auto object-cover"
							src="/avatar.png"
							alt="Default avatar"
						/>
					)}

					{isEditing && (
						<label className="absolute bottom-0 right-1/2 transform translate-x-16 bg-white p-2 rounded-full shadow cursor-pointer">
							<Camera size={20} />
							<input
								type="file"
								className="hidden"
								name="work"
								onChange={handleImageChange}
								accept="image/*,.pdf"
							/>
						</label>
					)}
				</div>

				<div className="flex flex-col items-center gap-2">
					<p className="text-center text-gray-600 text-sm">
						{userData.work ? "Work Uploaded" : "No Work uploaded"}
					</p>

					{/* ✅ Download Button Visible to All Users */}
					{userData.work && (
						<a
							href={userData.work}
							download="user_work"
							className="text-blue-600 underline text-sm"
						>
							Download Work
						</a>
					)}

					{isOwnProfile && (
						isEditing ? (
							<div className="flex flex-col">
								<h1>Only documents within 1 mb are supported</h1>
							<button
								onClick={handleSave}
								className="mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
							>
								Save
							</button>
							</div>
						) : (
							<button
								onClick={() => setIsEditing(true)}
								className="text-primary hover:text-primary-dark transition duration-300"
							>
								Edit
							</button>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default WorkSection;
