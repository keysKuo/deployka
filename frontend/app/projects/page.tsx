'use client';

import { useWebSocket } from "@/components/providers/socket-provider";

export default function ProjectPage() {
    const { sendMessage, messages, isConnected } = useWebSocket();

    const handleSendMessage = () => {
        sendMessage('Hello from client!');
    };

    return (
        <div className="w-full min-h-[100svh] flex flex-col items-center justify-center gap-4">
            <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
            <button className="btn bg-input px-4 py-2" onClick={handleSendMessage} disabled={!isConnected}>
                Send Message
            </button>

            <div className="flex flex-col items-start w-[60%] gap-4">
                {messages.map((message, index) => (
                    <li className="text-xs flex space-x-5 font-geist" key={index}>
                        <span>{message.timestamp}   </span>
                        <p>{message.content}</p>
                    </li>
                ))}
            </div>
        </div>
    );
}
