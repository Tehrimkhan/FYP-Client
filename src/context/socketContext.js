// import { createContext, useState } from "react";
// import { AuthContext } from "./authContext";

// export const SocketContext = createContext();

// export const SocketContextProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const { authUser } = AuthContext();

//   useEffect(() => {
//     if (authUser) {
//       const socket = io("http://192.168.0.107:8080");
//       socket.on("error", (error) => {
//         console.error("Socket connection error:", error);
//       });
//       setSocket(socket);

//       return () => socket.close();
//     } else {
//       if (socket) {
//         socket.close();
//         setSocket(null);
//       }
//     }
//   }, [authUser]);
//   return (
//     <SocketContextProvider value={{ socket, onlineUsers }}>
//       {children}
//     </SocketContextProvider>
//   );
// };
