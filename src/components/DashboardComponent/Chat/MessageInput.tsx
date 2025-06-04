"use client";
import { useState, useRef, useEffect } from "react";

interface MessageInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (text.trim() === "" || disabled) return;
    onSend(text);
    setText("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder={disabled ? "Connecting..." : "Type a message..."}
          className={`flex-1 p-3 rounded-full border ${
            disabled ? "bg-gray-100" : "bg-[#EBFBEF] focus:border-green-300"
          } focus:outline-none transition-colors`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={disabled}
        />
        <button
          className={`rounded-full px-4 py-3 font-semibold transition-colors ${
            disabled 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
          onClick={handleSend}
          disabled={disabled}
        >
          Send
        </button>
      </div>
    </div>
  );
}