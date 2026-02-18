import { MessageForm } from "./components/MessageForm";
import { MessageResponse } from "./components/MessageResponse";
import { useMessage } from "./hooks/useMessage";

function App() {
  const { response, loading, error, send } = useMessage();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Simple Form App</h1>

      <MessageForm onSubmit={send} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && <MessageResponse data={response} />}
    </div>
  );
}

export default App;
