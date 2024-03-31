/*import { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const socket = io("http://192.168.0.107:8080");
    socket.on("error", (error) => {
      console.error("Socket connection error:", error);
    });
    setSocket(socket);

    return () => socket.close();
 }, []);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
*/
