import type { MessageResponse as MessageResponseType } from "../types/message";

interface Props {
  data: MessageResponseType;
}

export function MessageResponse({ data }: Props) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <p> Convo thread: {data.thread_id}</p>
      <strong>Reply from the agent:</strong>
      <p>{data.reply}</p>
      {data.image_base64 && (
        <img
          src={`data:image/png;base64,${data.image_base64}`}
          alt="Generated"
          style={{ maxWidth: "100%", marginTop: "1rem" }}
        />
      )}
    </div>
  );
}
