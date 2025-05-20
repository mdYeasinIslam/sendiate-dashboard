import { useState } from "react";

interface MessageInputProps {
  onSend: (text: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

  return (
    <div className="bg-white mb-5 mr-5 rounded-b-lg p-3 flex items-center gap-2">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 p-2 mx-2 rounded-full border bg-[#EBFBEF] focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        className="bg-green-500 text-white rounded-full px-4 py-2 font-semibold"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}
