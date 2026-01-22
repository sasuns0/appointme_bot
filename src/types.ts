export type User = {
  id: number;
  is_bot: boolean;
  first_name: string;
  username: string;
}

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
}

export type Update = {
  update_id: number;
  message: Message;
  date: number;
  text: string;
}

export type GetUpdateResponse = [Update]
