export type User = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  unreadCount: number;
  chatId?: string;
};

export type Message = {
  senderId: string;
  text: string;
  timestamp: number;
  isRead?: boolean;
  images?: string[];
  id: string;
};
