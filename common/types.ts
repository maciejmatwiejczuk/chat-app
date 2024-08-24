export interface TransferredChatMessage {
  message: string;
  date: string;
}

export interface ClientEvents {
  chatMessageClient: (msg: string, callback: (date: string) => void) => void;
}

export interface ServerEvents {
  chatMessageServer: (msg: TransferredChatMessage) => void;
}
