import { useState } from "react";
import { sendMessage } from "../api/messageApi";
import type { MessageResponse } from "../types/message";

export function useMessage() {
  const [response, setResponse] = useState<MessageResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const send = async (input: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await sendMessage({ input });
      setResponse(data);
    } catch (err) {
      setError("Something went wrong " + err);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, send };
}
