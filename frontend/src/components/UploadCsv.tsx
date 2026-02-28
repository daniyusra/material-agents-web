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
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

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

    setResponseMessage("");
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

      setTimeout(() => {
        setResponseMessage("");
        setIsUploading(false);
        setIsUploaded(true);
      }, 500);
    } catch (error) {
      console.error("Upload failed:", error);
      setResponseMessage("Upload failed.");
      setIsUploading(false);
    } 
  };

  return (
    <div className="max-w-2xl mx-auto items-center gap-3 p-6 shadow-lg rounded-2xl bg-neutral-800 border border-neutral-700 my-3">
      <div className="flex">
        <div className="mx-auto">
          <label className="block text-sm font-medium pb-6">
            Upload CSV
          </label>
          {
            isUploaded && (
            <label className="block text-sm pb-6">
              File uploaded successfully! Filename: {file != null ? file.name : ""}
            </label>
          )}
          {
            !isUploaded && (
            <input
              type="file"
              id="csv-upload"
              accept=".csv, text/csv"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-xl file:border-0
                file:text-sm file:font-semibold
                file:bg-white file:text-black
                hover:file:bg-neutral-200"
              onChange={handleFileChange}
            />
          )}
        </div>
        
        <div className="mx-auto">
          <button
            onClick={handleUpload}
            disabled={isUploading || isUploaded}
            style={{ marginTop: "10px" }}
            className="bg-white text-black px-4 py-2 rounded-xl font-medium hover:bg-neutral-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      {isUploading && (
        <div className="mt-6 w-full max-w-xl mx-auto">
          
          <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>

          <div className="flex justify-between items-center mt-2 text-sm text-neutral-400">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>

        </div>
      )}

      {responseMessage && (
        <div className="mt-6 max-w-xl mx-auto text-sm text-emerald-400">
          Server response: {responseMessage}
        </div>
      )}
    </div>
  );
};

export default UploadCsv;