export interface MessageRequest {
  thread_id: string;
  table_name: string;
  message: string
}

export interface MessageResponse {
  thread_id: string;
  reply: string;
  image_base64: string;
}