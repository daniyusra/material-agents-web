import type { MessageRequest, MessageResponse } from "../types/message";

export async function sendMessage(
  request: MessageRequest
): Promise<MessageResponse> {
  const res = await fetch("http://localhost:8080/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
}