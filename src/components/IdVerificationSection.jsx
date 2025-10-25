import { useState } from "react";
import { Camera } from "lucide-react";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dvxyavyuv/image/upload";
const UPLOAD_PRESET = "my_unsigned_preset";

const IdVerificationSection = ({ userData, onSave, isOwnProfile }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedData, setEditedData] = useState({});
	const [uploading, setUploading] = useState(false);

	const handleFileChange = async (event) => {
		const file = event.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", UPLOAD_PRESET);

		setUploading(true);

		try {
			const response = await fetch(CLOUDINARY_URL, {
				method: "POST",
				body: formData,
			});

			const data = await response.json();

			if (data.secure_url) {
				setEditedData((prev) => ({
					...prev,
					idVerification: data.secure_url,
				}));
			}
		} catch (error) {
			console.error("Upload error:", error);
			alert("Upload failed. Please try again.");
		} finally {
			setUploading(false);
		}
	};

	const handleSave = () => {
		onSave(editedData);
		setIsEditing(false);
	};

	if (!isOwnProfile) return null; // 🔐 Hide entire section for others

	return (
		<div className="bg-white shadow rounded-lg mb-6">
			<div className="p-4">
				<h2 className="text-xl font-semibold mb-6">Upload ID Verification (JPG or PNG)</h2>

				<div className="relative mb-4 text-center">
					<img
						className="w-32 h-32 mx-auto object-cover rounded"
						src={editedData.idVerification || userData.idVerification || "/avatar.png"}
						alt="ID Verification"
					/>

					{isEditing && (
						<label className="absolute bottom-0 right-1/2 transform translate-x-16 bg-white p-2 rounded-full shadow cursor-pointer">
							<Camera size={20} />
							<input
								type="file"
								className="hidden"
								name="idVerification"
								onChange={handleFileChange}
								accept="image/*"
							/>
						</label>
					)}
				</div>

				<div className="flex flex-col items-center">
					{isEditing ? (
						<button
							onClick={handleSave}
							disabled={uploading}
							className="mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300 disabled:opacity-50"
						>
							{uploading ? "Uploading..." : "Save"}
						</button>
					) : (
						<>
							<p className="text-center text-gray-600 text-sm mb-2">
								{userData.idVerification ? "ID Uploaded" : "No ID uploaded"}
							</p>
							<button
								onClick={() => setIsEditing(true)}
								className="mt-2 text-primary hover:text-primary-dark transition duration-300"
							>
								Edit
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default IdVerificationSection;

