// import { User, Message } from "@/types";

import { Message, User } from "@/type";

interface ChatWindowProps {
  selectedUser: User | null;
  messages: Message[];
}

export default function ChatWindow({ selectedUser, messages }: ChatWindowProps) {
  if (!selectedUser) {
    return <div className="flex-1 flex items-center justify-center text-2xl text-gray-400">Welocome to Chat</div>;
  }

  return (
    <div className="flex-1  mr-5 bg-white rounded-t-lg flex flex-col">
      <div className=" p-4 flex items-center gap-3">
        <img src={selectedUser.avatar} className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold">{selectedUser.name}</p>
          <p className="text-sm text-green-500">Active now</p>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xs p-2 rounded-lg text-sm ${
              msg.senderId === "me" ? "ml-auto bg-green-100" : "mr-auto bg-gray-100"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}
