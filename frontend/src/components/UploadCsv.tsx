import React, { useState } from "react";
import axios from "axios";

interface UploadCsvProps {
  onUploadSuccess: (tableName: string) => void;
}

const UploadCsv: React.FC<UploadCsvProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setUploadProgress(0);
      setResponseMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);

      const response = await axios.post(
        "http://localhost:8080/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            }
          },
        }
      );

      onUploadSuccess(response.data);
      setResponseMessage("Upload successful");
    } catch (error) {
      console.error("Upload failed:", error);
      setResponseMessage("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Upload CSV</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />

      <button
        onClick={handleUpload}
        disabled={isUploading}
        style={{ marginTop: "10px" }}
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>

      {/* Progress Bar */}
      {isUploading && (
        <div style={{ marginTop: "15px" }}>
          <div
            style={{
              width: "100%",
              backgroundColor: "#e0e0e0",
              borderRadius: "5px",
              height: "20px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${uploadProgress}%`,
                backgroundColor: "#4caf50",
                height: "100%",
                transition: "width 0.2s ease",
              }}
            />
          </div>
          <p>{uploadProgress}%</p>
        </div>
      )}

      {responseMessage && (
        <p style={{ marginTop: "20px" }}>
          Server response: {responseMessage}
        </p>
      )}
    </div>
  );
};

export default UploadCsv;