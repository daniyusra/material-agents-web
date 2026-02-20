import { useState } from "react";
import { MessageForm } from "./components/MessageForm";
import { MessageResponse } from "./components/MessageResponse";
import UploadCsv from "./components/UploadCsv";
import { useMessage } from "./hooks/useMessage";

function App() {
  const { response, loading, error, send } = useMessage();
  const [tableName, setTableName] = useState<string | null>(null);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Simple Form App</h1>

      <UploadCsv onUploadSuccess={setTableName}/>

      {tableName && (
        <p style={{ color: "green" }}>
          Active table: {tableName}
        </p>
      )}

      <MessageForm onSubmit={send} disabled={!tableName}/>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && <MessageResponse data={response} />}
    </div>
  );
}

export default App;
