// import { User } from "@/types";

import { User } from "@/type/chatPage";
import Image from "next/image";

interface ChatListProps {
  users: User[];
  onSelectUser: (user: User) => void;
  selectedUserId: string | null;
}

export default function ChatList({ users, onSelectUser, selectedUserId }: ChatListProps) {
  return (
    <div className="w-78 m-5 mt-0  bg-white rounded-lg border-r p-4 overflow-y-auto">
      <h2 className="font-semibold text-lg mb-4">My Inbox</h2>
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => onSelectUser(user)}
          className={`flex items-start gap-3 p-3 cursor-pointer rounded-lg ${
            selectedUserId === user.id ? "bg-gray-100" : "hover:bg-gray-50"
          }`}
        >
          <Image
            src={user.avatar}
            width={500}
            height={500}
            alt={user?.name}
            className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
