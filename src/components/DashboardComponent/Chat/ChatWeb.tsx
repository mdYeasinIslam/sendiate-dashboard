import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import useWebSocket, { ReadyState } from "react-use-websocket";
import ChatInterface from "./ChatInterfaces";
import { Sidebar } from "./Sidebar";
import { RootState } from "../../redux/store";
import { useGetAdminQuery, useGetChatListQuery } from "../../redux/service/user/user.api";
import { useGetConversationQuery, useGetOrCreateConversationMutation } from "../../redux/service/chat/chatApi";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { AppConfig } from "../../config/config";
import { message } from "antd";

const WS_URL = AppConfig.WS_URL

interface User {
  id: string;
  role: string;
  name: string;
}

interface ChatUser {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface ChatListItem {
  chatUser: ChatUser;
  lastMessage?: {
    content: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

interface WebSocketMessage {
  type: string;
  conversation?: {
    id: string;
    messages: Message[];
  };
  message?: Message;
}

const Chat = () => {
  const { id: userIdFromParams } = useParams<{ id: string }>();

  // const searchParams = new URLSearchParams(window.location.search);
  // const userIdFromParams = searchParams.get("studentId");
  // const userIdFromParams = useParams<{ id: string }>()

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [roomId, setRoomId] = useState("");
  const [recipient, setRecipient] = useState<ChatUser | null>(null);
  const [userTwo, setUserTwo] = useState<string | null>(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { accessToken } = useSelector((state: RootState) => state.auth);
  const decodeUser = accessToken ? jwtDecode<User>(accessToken) : null;

  const { data: adminData } = useGetAdminQuery(undefined);
  const { data: chatListData, isLoading: isChatListLoading } = useGetChatListQuery(decodeUser?.id || "");
  // console.log(chatListData, "chatListData");
  const [getOrCreateConversation] = useGetOrCreateConversationMutation();
  const { data: conversationData, isLoading: conversationDataLoading } = useGetConversationQuery(
    { user1Id: decodeUser?.id || "", user2Id: userTwo || "" },
    { skip: !decodeUser?.id || !userTwo }
  );

  const admin = adminData?.data?.data?.[0] as ChatUser | undefined;

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<WebSocketMessage>(
    WS_URL,
    {
      onOpen: () => {
        if (decodeUser?.id && userTwo) {
          sendJsonMessage({
            type: "joinRoom",
            user1Id: decodeUser.id,
            user2Id: userIdFromParams,
          });
        }
      },
      onError: (event) => {
        console.error("WebSocket error:", event);
      },
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    const initializeConversation = async () => {
      if (decodeUser?.id && userTwo) {
        try {
          await getOrCreateConversation({
            user1Id: decodeUser.id,
            user2Id: userTwo,
          }).unwrap();
        } catch (error) {
          // console.error("Failed to create conversation:", error);
          if (error instanceof Error) {
            message.error(error.message);
          }
        }
      }
    };

    initializeConversation();
  }, [decodeUser?.id, userTwo, getOrCreateConversation]);

  useEffect(() => {
    if (userIdFromParams) {
      setUserTwo(userIdFromParams);
      setUserNotFound(false);

      if (!isChatListLoading && chatListData?.data) {
        const foundRecipient = (chatListData.data as ChatListItem[]).find(
          (chat) => chat.chatUser.id === userIdFromParams
        );
        if (foundRecipient) {
          setRecipient(foundRecipient.chatUser);
        } else {
          setRecipient({
            id: userIdFromParams,
            firstName: 'User',
            lastName: userIdFromParams.slice(0, 5),
          });
        }
      }
    } else if (admin && decodeUser?.role !== "SUPERADMIN") {
      setRecipient(admin);
      setUserTwo(admin.id);
    }
  }, [userIdFromParams, admin, chatListData, decodeUser?.role, isChatListLoading]);

  useEffect(() => {
    if (conversationData?.data) {
      setRoomId(conversationData.data.id);
      setMessages(conversationData.data.messages || []);
    }
  }, [conversationData]);

  useEffect(() => {
    if (lastJsonMessage) {
      const data = lastJsonMessage;

      if (data.type === "loadMessages" && data.conversation) {
        setMessages(data.conversation.messages || []);
        setRoomId(data.conversation.id);
      } else if (
        ["receiveMessage", "activeM"].includes(data.type) &&
        data.message !== undefined
      ) {
        setMessages((prev) =>
          data.message ? [...prev, data.message] : prev
        );
      }
    }
  }, [lastJsonMessage]);

  const handleSendMessage = async () => {
    if (!input.trim() || readyState !== ReadyState.OPEN || !roomId || !decodeUser?.id) return;

    try {
      sendJsonMessage({
        type: "sendMessage",
        chatroomId: roomId,
        senderId: decodeUser.id,
        senderName: decodeUser.name,
        content: input,
      });

      // await sendMessageApi({
      //   conversationId: roomId,
      //   senderId: decodeUser.id,
      //   content: input,
      // }).unwrap();

      setInput("");
    } catch (error) {
      // console.error("Failed to send message:", error);
      if (error instanceof Error) {
        message.error(error.message);
      }
    }
  };

  const showSidebar = !userIdFromParams || decodeUser?.role === "SUPERADMIN";



  if (isChatListLoading || conversationDataLoading) {
    return <div className="flex items-center justify-center h-full">
      <Loader />
    </div>;

  }

  return (
    <div className="flex flex-col md:flex-row h-full md:h-[calc(100vh-100px)] bg-white rounded-lg shadow-md overflow-hidden mb-20">
      {/* Mobile hamburger button */}
      {showSidebar && (
        <button
          className="md:hidden fixed top-40 left-90 z-50 p-2 rounded-md bg-gray-100 text-gray-700 shadow-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* Sidebar with mobile responsiveness */}
      {showSidebar && (
        <div
          className={${isSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-1/3 lg:w-1/4 border-r border-gray-100 bg-gray-50 overflow-y-auto fixed md:static h-full z-40 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0}
        >
          {/* Close button for mobile */}
          <button
            className="md:hidden absolute top-2 right-8 p-2 rounded-full  text-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            {/* <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg> */}
          </button>

          {isChatListLoading ? (
            <div className="flex items-center justify-center min-h-[80vh hidden">
              <Loader />
            </div> // You can replace this with a spinner component
          ) : chatListData?.data?.length ? (
            <div className="divide-y divide-gray-200 cursor-pointer">
              {(chatListData?.data as ChatListItem[]).map((chat) => (
                <Sidebar
                  key={chat.chatUser.id}
                  id={chat.chatUser.id}
                  setUseID={(id) => {
                    setUserTwo(id);
                    setIsSidebarOpen(false);
                  }}
                  firstName={chat.chatUser.firstName}
                  lastName={chat.chatUser.lastName}
                  message={chat.lastMessage?.content ?? ""}
                  active={userTwo === chat.chatUser.id}
                />
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">No conversations yet</div>
          )}
        </div>
      )}

      <div
        className={flex-1 flex flex-col ${showSidebar ? "" : "w-full"}}
        onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
      >
        {userNotFound ? (
          <div className="flex flex-col items-center justify-center h-full bg-gray-50">
            <div className="text-center p-6 rounded-lg">
              <div className="text-gray-400 mb-4">
                <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 
                      1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 
                      16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">User not found</h3>
              <p className="text-gray-500">The requested user doesn't exist in our system</p>
            </div>
          </div>
        ) : recipient ? (
          <ChatInterface
            id={decodeUser?.id || null}
            recipient={recipient}
            messages={messages}
            newMessage={input}
            setNewMessage={setInput}
            sendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-gray-50">
            <div className="text-center p-6 rounded-lg">
              <div className="text-gray-400 mb-4">
                <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 
                      12c0 4.418-4.03 8-9 8a9.863 9.863 0 
                      01-4.255-.949L3 20l1.395-3.72C3.512 
                      15.042 3 13.574 3 12c0-4.418 4.03-8 
                      9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                {userIdFromParams ? "Loading..." : "No chat selected"}
              </h3>
              <p className="text-gray-500">
                {userIdFromParams
                  ? "Loading user information..."
                  : "Choose a conversation from the sidebar"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;