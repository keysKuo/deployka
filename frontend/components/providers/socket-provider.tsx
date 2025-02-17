'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Message = {
    content: string;
    timestamp: string;
}

// Define the type for the context
type WebSocketContextType = {
    sendMessage: (message: string) => void;
    messages: Message[];
    isConnected: boolean;
}

// Create the context with an initial value of null
const WebSocketContext = createContext<WebSocketContextType | null>(null);

// Define props for the WebSocketProvider
type WebSocketProviderProps = {
    children: ReactNode;
}

// WebSocketProvider component
export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        // Initialize the WebSocket client connection
        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
            setIsConnected(true);
        };

        ws.onmessage = (event) => {
            const timestamp = new Date().toLocaleTimeString();
            console.log('Message received from server:', event.data);
            setMessages((prevMessages) => [...prevMessages, { content: event.data, timestamp }]);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
            setIsConnected(false);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            setIsConnected(false);
        };

        setSocket(ws);

        // Cleanup function when the component unmounts
        return () => {
            ws.close();
        };
    }, []);

    // Function to send a message to the WebSocket server
    const sendMessage = (message: string) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(message);
        } else {
            console.warn('WebSocket is not connected. Unable to send message.');
        }
    };

    return (
        <WebSocketContext.Provider value={{ sendMessage, messages, isConnected }}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Custom hook to use the WebSocket context
export const useWebSocket = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
