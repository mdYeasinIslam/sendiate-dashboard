"use client";

import LoadingSpinner from "@/app/loading";
import ChatList from "@/components/DashboardComponent/Chat/ChatList";
import ChatWindow from "@/components/DashboardComponent/Chat/ChatWindo";
import MessageInput from "@/components/DashboardComponent/Chat/MessageInput";
import PageWrapper from "@/components/PageWrapper";
import { useAppDispatch } from "@/redux/hooks";
import { setCount } from "@/redux/services/slicer/chat/chatSlice";
import { Message, User } from "@/type/chatPage";
import { useState, useEffect, useRef, useCallback } from "react";

interface WebSocketMessage {
	event: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data?: any;
	message?: string;
	token?: string;
}
// const WS_URL = `wss://10.0.30.76/admin-chat`;
// const WS_URL = `wss://patrkamh.onrender.com/admin-chat`;
const WS_URL = `wss://api.sendiate.code-commando.com/admin-chat`;

const ChatPage = () => {
	const dispatch = useAppDispatch()
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [currentChatId, setCurrentChatId] = useState<string | null>(null);
	const [connectionStatus, setConnectionStatus] = useState("disconnected");
	const ws = useRef<WebSocket | null>(null);
	const [messagesLoading, setMessagesLoading] = useState(false);

	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (!messages && !users) return setLoading(false)
		// Simulate data fetching
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);
	// Reconnect with exponential backoff
	// const reconnect = useCallback(() => {
	// 	const delay = Math.min(1000 * Math.pow(2, retryCount), 30000);
	// 	setTimeout(() => {
	// 		// console.log(`Attempting to reconnect (attempt ${retryCount + 1})`);
	// 		connectWebSocket();
	// 	}, delay);
	// }, [retryCount]);

	const authenticate = useCallback((token: string) => {
		if (ws.current?.readyState === WebSocket.OPEN) {
			const authPayload: WebSocketMessage = {
				event: "authenticate",
				token: token,
			};
			ws.current.send(JSON.stringify(authPayload));
		}
	}, []);

	const handleWebSocketMessage = useCallback((message: WebSocketMessage) => {
		console.log("Received message:", message);

		switch (message.event) {
			case "authenticated":
				setIsAuthenticated(true);
				setConnectionStatus("connected");

				fetchAllConversations();

				setInterval(() => {
					fetchAllConversations();
				}, 1000);



				break;
			case "allConversations":
				console.log(message, "message form formated user")
				const formattedUsers =
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					message.data?.map((conv: any) => ({
						id: conv.userId,
						name: conv.user?.fullName || "Unknown User",
						avatar: conv.user?.profileImage || "",
						// lastMessage: conv.messages[0]?.message || "No messages yet",
						lastMessage: conv.lastMessage,
						chatId: conv.id,
						isRead: conv.isRead,
						adminId: conv.adminId,
						senderId: conv.senderId,
						unreadCount: conv.unreadCount || 0,
					})) || [];
				console.log(formattedUsers, "jf")
				setUsers(formattedUsers);
				break;
			case "fetchAllConversations":

				const formattedUserss =
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					message.data?.map((conv: any) => ({
						id: conv.userId,
						name: conv.user?.fullName || "Unknown User",
						avatar: conv.user?.profileImage || "",
						// lastMessage: conv.messages[0]?.message || "No messages yet",
						lastMessage: conv.lastMessage,
						chatId: conv.id,
						unreadCount: conv.unreadCount || 0,
					})) || [];
				setUsers(formattedUserss);
				break;
			case 'unreadConversationCount':
				// console.log('Message count',message.data)
				dispatch(setCount(message?.data?.count))
				break;
			case "chatStarted":
			case "messages":
				setCurrentChatId(message.data?.id || null);
				const formattedMessages =
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					message.data?.messages?.map((msg: any) => ({
						id: msg.id,
						senderId: msg.senderId,
						text: msg.message,
						images: msg.images || [],
						timestamp: new Date(msg.createdAt).getTime(),
						isRead: msg.isRead,
						sender: msg.sender || {
							id: msg.senderId,
							fullName: "Unknown",
							email: "",
							profileImage: "",
						},
					})) || [];
				setMessages(formattedMessages);
				break;
			case "messageSent":
				const newMessage = {
					id: message.data?.id,
					senderId: message.data?.senderId,
					text: message.data?.message,
					images: message.data?.images || [],
					timestamp: new Date(message.data?.createdAt).getTime(),
					isRead: message.data?.isRead,
					sender: message.data?.sender || {
						id: message.data?.senderId,
						fullName: "Unknown",
						email: "",
						profileImage: "",
					},
				};
				setMessages((prev) => [...prev, newMessage]);
				break;

			case "newMessage":
				const upCommingMessage = {
					id: message.data?.id,
					senderId: message.data?.senderId,
					text: message.data?.message,
					images: message.data?.images || [],
					timestamp: new Date(message.data?.createdAt).getTime(),
					isRead: message.data?.isRead,
					sender: message.data?.sender || {
						id: message.data?.senderId,
						fullName: "Unknown",
						email: "",
						profileImage: "",
					},
				};
				setMessages((prev) => [...prev, upCommingMessage]);
				break;
			case "error":
				console.error("WebSocket error:", message.message);
				break;
			default:
				console.log("Unhandled WebSocket message:", message);
		}
	}, []);

	const connectWebSocket = useCallback(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			// console.error("No authentication token found");
			return;
		}

		try {
			setConnectionStatus("connecting");
			ws.current = new WebSocket(WS_URL);

			ws.current.onopen = () => {
				console.log("WebSocket connected");
				authenticate(token);
			};

			ws.current.onmessage = (event) => {
				try {
					const message: WebSocketMessage = JSON.parse(event.data);
					handleWebSocketMessage(message);
				} catch (error) {
					console.error("Error parsing WebSocket message:", error);
				}
			};

			ws.current.onclose = () => {
				console.log("WebSocket disconnected");
				setConnectionStatus("disconnected");

			};

			ws.current.onerror = (error) => {
				console.error("WebSocket error:", error);
				setConnectionStatus("error");
			};
		} catch (error) {
			console.error("WebSocket connection error:", error);
		}
	}, [authenticate, handleWebSocketMessage, isAuthenticated]);

	const sendWebSocketMessage = useCallback((message: object) => {
		if (ws.current?.readyState === WebSocket.OPEN) {
			try {
				ws.current.send(JSON.stringify(message));
				return true;
			} catch (error) {
				console.error("Error sending message:", error);
				return false;
			}
		} else {
			console.warn("Cannot send message - WebSocket not ready");
			return false;
		}
	}, []);
	const joinChatRoom = useCallback((chatId: string) => {
		if (ws.current?.readyState === WebSocket.OPEN) {
			try {
				ws.current.send(JSON.stringify({ event: "joinConversation", chatId }));
				return true;
			} catch (error) {
				console.error("Error sending message:", error);
				return false;
			}
		} else {
			console.warn("Cannot send message - WebSocket not ready");
			return false;
		}
	}, []);

	const fetchAllConversations = useCallback(() => {
		sendWebSocketMessage({ event: "fetchAllConversations" });
		sendWebSocketMessage({ event: "fetchUnreadConversationCount" });
	}, [sendWebSocketMessage]);


	const startChat = useCallback(
		(userId: string) => {
			sendWebSocketMessage({
				event: "startChat",
				targetUserId: userId,
			});
		},
		[sendWebSocketMessage]
	);



	const markMessagesAsRead = useCallback(() => {
		if (!currentChatId) return;
		sendWebSocketMessage({
			event: "markMessagesAsRead",
			chatId: currentChatId,
		});
	}, [currentChatId, sendWebSocketMessage]);

	useEffect(() => {
		markMessagesAsRead();
		console.log(messages, "from useeffect")
	}, [messages]);

	const fetchMessages = useCallback(
		(chatId: string) => {
			sendWebSocketMessage({
				event: "fetchMessages",
				chatId: chatId,
			});
		},
		[sendWebSocketMessage]
	);

	const handleSend = useCallback(
		(text: string, images: string[] = []) => {
			if (!currentChatId) return;
			const success = sendWebSocketMessage({
				event: "sendMessage",
				chatId: currentChatId,
				message: text,
				images: images,
			});
			if (success) {
				markMessagesAsRead();
			}
		},
		[currentChatId, sendWebSocketMessage, markMessagesAsRead]
	);
	// const handleSend = useCallback(
	// 		(text: string, images: string[] = []) => {
	// 			if (!currentChatId) return;
	// 			const success = sendWebSocketMessage({
	// 				event: "sendMessage",
	// 				chatId: currentChatId,
	// 				message: text,
	// 				images: images,
	// 			});
	// 			if (success) {
	// 				markMessagesAsRead();
	// 			}
	// 		},
	// 		[currentChatId, sendWebSocketMessage,markMessagesAsRead]
	// 	);
	const handleUserSelect = useCallback(
		async (user: User) => {
			setSelectedUser(user);
			setMessagesLoading(true); // Start loader
			console.log("selected", user);

			try {
				if (user?.chatId) {
					await fetchMessages(user.chatId); // Assuming fetchMessages is async
					joinChatRoom(user.chatId);
				} else if (user?.id) {
					await startChat(user.id); // Assuming startChat handles message initialization
				}
				markMessagesAsRead();
			} catch (error) {
				console.error("Error loading chat:", error);
			} finally {
				setMessagesLoading(false); // Stop loader
			}
		},
		[fetchMessages, markMessagesAsRead, startChat]
	);

	useEffect(() => {
		connectWebSocket();
		return () => {
			ws.current?.close();
		};
	}, [connectWebSocket]);
	if (loading || messagesLoading || !users?.length) {
		return (
			<div className="flex items-center justify-center h-full">
				<LoadingSpinner />
			</div>
		);
	}
	// console.log(users)
	if (users?.length === 0) {
		return (
			<div className="flex items-center justify-center h-full text-3xl">
				{/* <LoadingSpinner /> */}
				No message found!!
			</div>
		);
	}
	console.log('Messages', messages)
	return (
		<section className="h-full">
			<header>
				<PageWrapper title="Chat" />
			</header>
			<div className="flex h-full">

				<ChatList
					messages={messages}
					users={users}
					onSelectUser={handleUserSelect}
					selectedUserId={selectedUser?.id || null}
				/>
				<div className="flex flex-col flex-grow border-l bg-white border-gray-200">
					{selectedUser ? (
						messagesLoading ? (
							<div className="flex flex-col items-center justify-center h-full text-gray-500">
								<div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
								Loading messages...
							</div>
						) : (
							<>
								<ChatWindow
									selectedUser={selectedUser}
									messages={messages}
									loggedInUserId={
										typeof window !== "undefined"
											? localStorage.getItem("userId") || ""
											: ""
									}
								/>
								<MessageInput
									onSend={handleSend}
									disabled={connectionStatus !== "connected"}
								/>
							</>
						)
					) : (
						<div className="flex items-center justify-center h-full text-gray-500">
							Select a user to start chatting
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default ChatPage;
