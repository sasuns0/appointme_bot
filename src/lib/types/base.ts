import type { User } from "./user";

export type ChatType = 'private' | 'public'

export type Chat = {
  id: number;
  first_name: string;
  username: string;
  type: ChatType;
}

export type Message = {
  message_id: number;
  from: User;
  chat: Chat;
  text: string;
}

export type Update = {
  update_id: number;
  message: Message;
  date: number;
}

export type GetUpdateResponse = {
  ok: boolean;
  result: [Update];
}
