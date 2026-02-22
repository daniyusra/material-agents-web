import { useState, type FormEvent } from "react";
import UploadCsv from "./UploadCsv";

interface MessageFormProps {
  onSubmit: (input: string, tableName: string) => void;
}

export function MessageForm({ onSubmit}: MessageFormProps) {
  const [input, setInput] = useState<string>("");
  const [tableName, setTableName] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tableName) return;
    onSubmit(input, tableName);
    setInput("");
  };

  return (
    <div>
      <UploadCsv onUploadSuccess={setTableName}/>

      {tableName && (
        <p style={{ color: "green" }}>
          Active table: {tableName}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" disabled={!tableName}>Send</button>
      </form>
    </div>
  );
}