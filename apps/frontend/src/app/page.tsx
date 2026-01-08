'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export default function Home() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [counter, setCounter] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const socketInstance = io(process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001');

    socketInstance.on('connect', () => {
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    socketInstance.on('counterUpdated', (data: { id: number; value: number }) => {
      setCounter(data.value);
    });

    setSocket(socketInstance);

    // Fetch initial counter value
    fetch(process.env.NEXT_PUBLIC_API_URL + '/counter' || 'http://localhost:3001/counter')
      .then((res) => res.json())
      .then((data) => setCounter(data.value))
      .catch(() => {});

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleClick = () => {
    if (socket && isConnected) {
      socket.emit('incrementCounter');
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-9xl">0</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center cursor-pointer select-none"
      onClick={handleClick}
    >
      <div className="text-center">
        <div className="text-9xl">{counter}</div>
      </div>
    </div>
  );
}
