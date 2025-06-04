import { Message, User } from "@/type/chatPage";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { FiClock, FiCheck, FiCheckCircle } from "react-icons/fi";

interface ChatWindowProps {
  selectedUser: User | null;
  messages: Message[];
  loggedInUserId: string;
  isLoading?: boolean;
  isSending?: boolean;
  connectionStatus?: "connected" | "connecting" | "disconnected";
}

export default function ChatWindow({
  selectedUser,
  messages,
  loggedInUserId,
  isLoading = false,
  isSending = false,
  connectionStatus = "connected"
}: ChatWindowProps) {
  const [isTyping, setIsTyping] = useState(false);
  const [messageGroups, setMessageGroups] = useState<{ date: string, messages: Message[] }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior,
      });
    }
  }, []);

  // Initial load scroll to bottom
  useEffect(() => {
    if (initialLoad && messages.length > 0) {
      scrollToBottom('auto');
      setInitialLoad(false);
    }
  }, [messages, initialLoad, scrollToBottom]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (!initialLoad && messages.length > 0) {
      const container = messagesContainerRef.current;
      if (!container) return;

      // Check if we should scroll to bottom (user near bottom or new message from other)
      const lastMessage = messages[messages.length - 1];
      const isNewMessageFromOther = lastMessage.senderId !== loggedInUserId;
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 120;

      if (isNewMessageFromOther || isNearBottom) {
        scrollToBottom();
      }
    }
  }, [messages, loggedInUserId, initialLoad, scrollToBottom]);

  // Group messages by date
  useEffect(() => {
    const grouped = messages.reduce((groups, message) => {
      const date = new Date(message.timestamp).toLocaleDateString();
      const existingGroup = groups.find(group => group.date === date);

      if (existingGroup) {
        existingGroup.messages.push(message);
      } else {
        groups.push({ date, messages: [message] });
      }

      return groups;
    }, [] as { date: string, messages: Message[] }[]);

    setMessageGroups(grouped);
  }, [messages]);

  // Typing indicator logic
  useEffect(() => {
    if (messages.length > 0 && !isSending && connectionStatus === "connected") {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.senderId !== loggedInUserId) {
        setIsTyping(true);
        const timer = setTimeout(() => setIsTyping(false), 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [messages, isSending, connectionStatus, loggedInUserId]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-lg p-8">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Welcome to Chat</h2>
          <p className="text-gray-500">
            Select a conversation or start a new one to begin messaging
          </p>
        </div>
      </div>
    );
  }
  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader />
      </div>
    );
  }
  const renderMessage = (msg: Message) => {
    const isSender = msg.senderId === loggedInUserId;
    return (
      <div key={msg.id} className={`flex ${isSender ? "justify-start" : "justify-end"} mb-2`}>
        <div
          className={`max-w-[80%] rounded-lg p-3 ${isSender ? "bg-gray-100 text-gray-800" : "bg-green-500 text-white"
            }`}
        >
          <p className="whitespace-pre-wrap break-words">{msg.text}</p>
          <div className={`text-right text-xs mt-1 ${isSender ? "text-gray-500" : "text-blue-200"
            }`}>
            {new Date(msg.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {!isSender && (
              <span className="ml-1">
                {msg.isRead ? (
                  <FiCheckCircle className="inline" />
                ) : (
                  <FiCheck className="inline" />
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Chat header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src={selectedUser.avatar || '/default-image.jpg'}
                alt={selectedUser.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white ${connectionStatus === "connected" ? "bg-green-500" : "bg-gray-400"
                }`}></span>
            </div>
            <div>
              <h1 className="font-semibold text-lg">{selectedUser.name}</h1>
              <p className="text-xs text-green-500">
                {isTyping ? "Typing..." : "Online"}
              </p>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {connectionStatus.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Messages container */}
      <div
        className="flex-1 p-4 overflow-y-auto bg-gray-50"
        ref={messagesContainerRef}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {messageGroups.map((group) => (
              <div key={group.date} className="space-y-3">
                <div className="text-center text-xs text-gray-500 my-2">
                  {group.date}
                </div>
                {group.messages.map(renderMessage)}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}

            {isSending && (
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white rounded-lg px-4 py-3 opacity-80">
                  <div className="flex items-center space-x-2">
                    <span>Sending...</span>
                    <div className="animate-spin">
                      <FiClock size={14} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}