'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export default function Home() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001');

    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
    });

    socketInstance.on('message', (data) => {
      setMessages((prev) => [...prev, `Echo: ${JSON.stringify(data)}`]);
    });

    socketInstance.on('broadcast', (data) => {
      setMessages((prev) => [...prev, `Broadcast: ${JSON.stringify(data)}`]);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && message) {
      socket.emit('message', { text: message });
      setMessage('');
    }
  };

  const sendBroadcast = () => {
    if (socket && message) {
      socket.emit('broadcast', { text: message });
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Clicker App</h1>

        <div className="mb-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <div
              className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
            />
            <span className="font-semibold">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={sendMessage}
                disabled={!isConnected || !message}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Message
              </button>
              <button
                onClick={sendBroadcast}
                disabled={!isConnected || !message}
                className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Broadcast
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Messages</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-gray-500">No messages yet...</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className="p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
                >
                  {msg}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
