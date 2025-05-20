export type User = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
};

export type Message = {
  senderId: string;
  text: string;
  timestamp: number;
};
