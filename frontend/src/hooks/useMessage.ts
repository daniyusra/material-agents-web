import { useState } from "react";
import { sendMessage } from "../api/messageApi";
import type { MessageResponse } from "../types/message";

export function useMessage() {
  const [response, setResponse] = useState<MessageResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const send = async (userInput: string, tableName: string) => {
    try {
      setLoading(true);
      setError(null);
      setUserInput(userInput);

      const data = await sendMessage({message: userInput, table_name: tableName, thread_id:""});
      setResponse(data);
    } catch (err) {
      setError("Something went wrong " + err);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, send, userInput };
}
