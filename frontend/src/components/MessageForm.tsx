import { useState, type FormEvent } from "react";
import UploadCsv from "./UploadCsv";

interface MessageFormProps {
  onSubmit: (input: string, tableName: string) => void;
  loading: boolean;
}

export function MessageForm({ onSubmit , loading}: MessageFormProps) {
  const [input, setInput] = useState<string>("");
  const [tableName, setTableName] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tableName) return;
    onSubmit(input, tableName);
    setInput("");
  };

  return (
      <div className="p-6">
        <UploadCsv onUploadSuccess={setTableName}/>
        
        <form onSubmit={handleSubmit}
          className="max-w-2xl mx-auto flex items-center gap-3 bg-neutral-800 rounded-2xl px-4 py-3 shadow-lg border border-neutral-700"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 bg-transparent outline-none text-white placeholder-neutral-400"
          />

          <button
            type="submit"
            className="bg-white text-black px-4 py-2 rounded-xl font-medium hover:bg-neutral-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!tableName || loading}
          >
            Send
          </button>
        </form>
      </div>
  );
}