import { useState, useEffect, useRef, useCallback } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setCount } from "@/redux/services/slicer/chat/chatSlice";

const WS_URL = `wss://patrkamh.onrender.com/admin-chat`;

const useUnreadCount = () => {
  const dispatch = useAppDispatch();
  const ws = useRef<WebSocket | null>(null);
  const [unreadCount, setUnreadCount] = useState<number | null>(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");

  // Function to send WebSocket message
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

  // Function to handle WebSocket messages
  const handleWebSocketMessage = useCallback((message: any) => {
    console.log("Received WebSocket message:", message); // Log the message for debugging

    switch (message.event) {
      case "unreadConversationCount":
        const count = message.data?.count || 0;
        console.log("Unread count received:", count); // Log the count for debugging
        dispatch(setCount(count)); // Update Redux state
        setUnreadCount(count); // Set local unread count
        break;
      default:
        console.log("Unhandled WebSocket message:", message);
    }
  }, [dispatch]);

  // WebSocket connection logic
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setConnectionStatus("connecting");
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      sendWebSocketMessage({ event: "authenticate", token: token });

      // Delay the fetchUnreadConversationCount by 1 second
      setInterval(() => {
        sendWebSocketMessage({ event: "fetchUnreadConversationCount" });
      }, 1000); // Delay of 1 second
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        handleWebSocketMessage(message);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.current.onclose = () => {
      setConnectionStatus("disconnected");
      console.log("WebSocket disconnected");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionStatus("error");
    };

    // Cleanup on unmount
    return () => {
      ws.current?.close();
    };
  }, [sendWebSocketMessage, handleWebSocketMessage]);

  return { unreadCount, connectionStatus };
};

export default useUnreadCount;
