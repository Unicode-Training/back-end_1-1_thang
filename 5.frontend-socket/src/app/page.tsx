"use client";

import EventEmitter from "@/utils/emiter";
import { ChangeEvent, useEffect, useState } from "react";

const WEBSOCKET_URL = "ws://localhost:8080";

const emitter = new EventEmitter();
type Message = {
  messageId: string;
  message: string;
  createdAt: Date;
};
export default function HomePage() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [randomValue, setRandomValue] = useState<string>("");
  useEffect(() => {
    const connectWebsocket = () => {
      const socket = new WebSocket(WEBSOCKET_URL);
      socket.addEventListener("open", () => {
        console.log("Đã kết nối tới websocket server");
      });
      socket.addEventListener("close", () => {
        console.log("Đã đóng kết nối websocket server");
      });
      socket.addEventListener("message", (event) => {
        const { type, data } = JSON.parse(event.data);
        emitter.emit(type, data);
      });

      setSocket(socket);
    };
    connectWebsocket();

    const getListMessage = async () => {
      const response = await fetch(`http://localhost:3000/api/messages`);
      const { data } = await response.json();
      setMessageList(data);
    };
    getListMessage();
  }, []);

  useEffect(() => {
    emitter.on("list-message", (data: unknown) => {
      setMessageList(data as Message[]);
    });

    emitter.on("random-value", (data: unknown) => {
      setRandomValue(data as string);
    });

    // socket?.addEventListener("open", () => {
    //   socket?.send(JSON.stringify({ type: "init-message" }));
    // });
  }, [socket]);

  const handleSend = async () => {
    // socket?.send(JSON.stringify({ type: "send-message", data: message }));
    await fetch(`http://localhost:3000/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    setMessage("");
  };
  return (
    <div>
      <h1 className="mb-3 font-medium text-3xl">
        Demo Websocket: {randomValue}
      </h1>
      <div className="mb-3 p-5 border border-gray-300 rounded-xl max-w-100 h-50 overflow-auto">
        {messageList?.map?.((message) => (
          <div key={message.messageId} className="mb-3">
            <p>{message.message}</p>
            <span className="text-xs italic">
              {message.createdAt.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="block mb-3 px-3 py-1 border border-gay-100 outline-none max-w-100"
        placeholder="Tin nhắn..."
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMessage(e.target.value)
        }
        value={message}
        required
      />
      <button
        className="bg-green-600 px-3 py-1 text-white"
        onClick={handleSend}
      >
        Send Message
      </button>
    </div>
  );
}
