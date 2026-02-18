import { useState, type FormEvent } from "react";

interface MessageFormProps {
  onSubmit: (input: string) => void;
}

export function MessageForm({ onSubmit }: MessageFormProps) {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}