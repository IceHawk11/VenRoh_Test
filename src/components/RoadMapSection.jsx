import { X, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dvxyavyuv/auto/upload";
const UPLOAD_PRESET = "my_unsigned_preset";

const RoadMapSection = ({ userData, isOwnProfile, onSave }) => {
  const initialRoadmap = userData.Roadmap?.length ? userData.Roadmap : [];

  const [isEditing, setIsEditing] = useState(false);
  const [roadmap, setRoadmap] = useState(initialRoadmap);
  const [uploadingIndex, setUploadingIndex] = useState(null);

  const handleChange = (index, field, value) => {
    const updated = [...roadmap];
    updated[index][field] = value;
    setRoadmap(updated);
  };

  const handlePDFUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    setUploadingIndex(index);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.secure_url) {
        handleChange(index, "pdf", data.secure_url);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("PDF upload failed");
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleAddYear = () => {
    if (roadmap.length < 5) {
      setRoadmap([...roadmap, { year: "", description: "", pdf: "" }]);
    }
  };

  const handleRemoveYear = (index) => {
    const updated = roadmap.filter((_, idx) => idx !== index);
    setRoadmap(updated);
  };

  const handleSave = () => {
    onSave({ Roadmap: roadmap });
    setIsEditing(false);
  };

  const handleRemoveAll = () => {
    setRoadmap([]);
    onSave({ Roadmap: [] });
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">RoadMap</h2>

      {!isEditing ? (
        roadmap.length > 0 && roadmap.some((entry) => entry.year || entry.description || entry.pdf) ? (
          <div className="space-y-4 mb-4">
            {roadmap.map((entry, idx) => (
              <div key={idx} className="text-gray-700">
                <p><strong>Year:</strong> {entry.year || "N/A"}</p>
                <p><strong>Description:</strong> {entry.description || "N/A"}</p>
                <p>
                  <strong>PDF:</strong>{" "}
                  {entry.pdf ? (
                    <span className="flex gap-4 mt-1">
                      <a
                        href={entry.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Preview
                      </a>
                      {!isOwnProfile && (
                        <a
                          href={entry.pdf}
                          download={`Roadmap_Year${entry.year || idx + 1}.pdf`}
                          className="text-green-600 underline"
                        >
                          Download
                        </a>
                      )}
                    </span>
                  ) : "Not uploaded"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-4">No roadmap data available.</p>
        )
      ) : (
        <div className="space-y-6">
          {roadmap.map((entry, idx) => (
            <div key={idx} className="border p-4 rounded relative">
              {roadmap.length > 1 && (
                <button
                  onClick={() => handleRemoveYear(idx)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  title="Remove Year"
                >
                  <Trash2 size={16} />
                </button>
              )}

              <div className="mb-2">
                <label className="block text-sm font-medium">Year (Numeric)</label>
                <input
                  type="number"
                  placeholder={`Year ${idx + 1}`}
                  value={entry.year}
                  onChange={(e) => handleChange(idx, "year", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  placeholder={`Description for Year ${idx + 1}`}
                  value={entry.description}
                  onChange={(e) => handleChange(idx, "description", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium">Upload PDF</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handlePDFUpload(e, idx)}
                />
                {uploadingIndex === idx && <p className="text-sm text-gray-500">Uploading...</p>}
                {entry.pdf && (
                  <p className="text-sm text-green-600 mt-1">
                    PDF uploaded:{" "}
                    <a
                      href={entry.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      View
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))}

          {roadmap.length < 5 && (
            <button
              onClick={handleAddYear}
              className="flex items-center gap-1 text-primary hover:text-primary-dark transition"
            >
              <Plus size={16} />
              Add Another Year
            </button>
          )}
        </div>
      )}

      {isOwnProfile && (
        <div className="flex gap-4 mt-4 items-center flex-wrap">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
              >
                Save Changes
              </button>
              <button
                onClick={handleRemoveAll}
                className="text-red-500 flex items-center gap-1"
              >
                <X size={16} />
                Remove All Roadmap
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-primary hover:text-primary-dark transition duration-300"
            >
              Edit Roadmap
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RoadMapSection;
