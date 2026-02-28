import { MessageForm } from "./components/MessageForm";
import { MessageResponse } from "./components/MessageResponse";
import { useMessage } from "./hooks/useMessage";

function App() {
  const { response, loading, error, send, userInput } = useMessage();

  return (
    <div className="h-screen bg-neutral-900 text-white flex flex-col w-full overflow-y-auto">
      
      {/* Top Spacer */}
      <div className="flex-none flex items-center justify-center p-6">
        <h1 className="text-3xl font-semibold text-neutral-300">
          Data Visualization Agent
        </h1>
      </div>

      {/* Input Area */}
      <div className="flex-none px-6 ">
        <MessageForm onSubmit={send} loading={loading}/>
      </div>

      <div className="flex-1">
        <MessageResponse loading={loading} error={error} response={response} userInput={userInput}/>
      </div>
    </div>
  );
}

export default App;
