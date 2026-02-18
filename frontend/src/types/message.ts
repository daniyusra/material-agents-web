export interface MessageRequest {
  input: string;
}

export interface MessageResponse {
  id: number;
  userInput: string;
  generatedResponse: string;
}