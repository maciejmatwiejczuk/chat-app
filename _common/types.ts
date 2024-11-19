export interface ChatMessageClient {
  message: string;
  senderId: number;
  receiverId: number;
}

export interface TransferredChatMessage {
  message: string;
  date: string;
}

export interface ErrorServer {
  message: string;
}

export interface ClientEvents {
  'chat_message:client': (
    msg: ChatMessageClient,
    callback: (date: string) => void
  ) => void;
}

export interface ServerEvents {
  'chat_message:server': (msg: TransferredChatMessage) => void;
  'error:server': (err: ErrorServer) => void;
}

export interface FieldError {
  field: string;
  message: string;
}
