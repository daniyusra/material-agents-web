import type { MessageResponse as MessageResponseType } from "../types/message";

interface Props {
  loading: boolean;
  error: string | null;
  response: MessageResponseType | null;
  userInput: string | null;
}

export function MessageResponse({loading,error,response,userInput}: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 mb-4 bg-neutral-700 border border-neutral-700 rounded-2xl shadow-lg min-h-[300px]">
      <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-700/60 backdrop-blur-sm">
        <h2 className="font-semibold text-neutral-300 text-right">
        User Question
        </h2>
      </div>
      
      <div className="p-6 text-neutral-200">
        {userInput && (
          <div className="space-y-4 text-neutral-200 text-right">
            <div className="text-base leading-relaxed whitespace-pre-wrap">
              {userInput}
            </div>
          </div>
        )}
      </div>

      {/* Card Header */}
      <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-700/60 backdrop-blur-sm">
        <h2 className="font-semibold text-neutral-300">
          Agent Response
        </h2>
      </div>

      {/* Card Body */}
      <div className="p-6 text-neutral-200">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center gap-3 text-neutral-300">
            <div className="h-4 w-4 rounded-full bg-blue-500 animate-pulse" />
            <span>Thinking...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-red-400 font-medium">
            ⚠ {error}
          </div>
        )}

        {/* Success State */}
        {response && !loading && !error && (
          <div className="space-y-4 text-neutral-200">

            <div className="text-xs text-neutral-500">
              Thread: {response.thread_id}
            </div>

            <div className="text-base leading-relaxed whitespace-pre-wrap">
              {response.reply}
            </div>

            {response.image_base64 && (
              <img
                src={`data:image/png;base64,${response.image_base64}`}
                alt="Generated"
                className="rounded-xl mt-4 max-w-full border border-neutral-700 block mx-auto"
              />
            )}

          </div>
        )}
      </div>
    </div>
  );
}
