import type { MessageResponse as MessageResponseType } from "../types/message";

interface Props {
  data: MessageResponseType;
}

export function MessageResponse({ data }: Props) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <strong>Backend Response:</strong>
      <p>{data.generatedResponse}</p>
    </div>
  );
}
