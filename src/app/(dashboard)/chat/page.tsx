"use client";

import ChatList from "@/components/Chat/ChatList";
import ChatWindow from "@/components/Chat/ChatWindo";
import MessageInput from "@/components/Chat/MessageInput";
import PageWrapper from "@/components/PageWrapper";
import { Message, User } from "@/type";
import { useState } from "react";



const dummyUsers: User[] = [
  {
    id: "1",
    name: "Alex Parera",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Let me know when you're free",
  },
  {
    id: "2",
    name: "Abel's Delivery Service",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Can you pick up my parcel?",
  },
  {
    id: "33",
    name: "Alex Parera",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Let me know when you're free",
  },
  {
    id: "3",
    name: "Abel's Delivery Service",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Can you pick up my parcel?",
  },
  {
    id: "4",
    name: "Alex Parera",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Let me know when you're free",
  },
  {
    id: "5",
    name: "Abel's Delivery Service",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Can you pick up my parcel?",
  },
  {
    id: "6",
    name: "Alex Parera",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Let me know when you're free",
  },
  {
    id: "7",
    name: "Abel's Delivery Service",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Can you pick up my parcel?",
  },
  {
    id: "8",
    name: "Alex Parera",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Let me know when you're free",
  },
  {
    id: "9",
    name: "Abel's Delivery Service",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Can you pick up my parcel?",
  },
  {
    id: "10",
    name: "Alex Parera",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Let me know when you're free",
  },
  {
    id: "11",
    name: "Alex Parera",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Let me know when you're free",
  },
];

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = (text: string) => {
    const newMessage: Message = {
      senderId: "me",
      text,
      timestamp: Date.now(),
    };
    setMessages([...messages, newMessage]);

  };


  return (
    <div className="bg-gray-100 h-screen">
      <PageWrapper title="Chat" />

      <div className="flex ">
        <ChatList
          users={dummyUsers}
          selectedUserId={selectedUser?.id ?? null}
          onSelectUser={setSelectedUser}
        />
        <div className="flex flex-col  md:flex-1">
          <ChatWindow selectedUser={selectedUser} messages={messages} />
          {selectedUser && <MessageInput onSend={handleSend} />}
        </div>
      </div>
    </div>
  );
}
