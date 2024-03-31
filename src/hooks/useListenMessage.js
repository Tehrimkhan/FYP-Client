/*import React, { useEffect } from "react";
import ChatMessagePage, {
  useSocketContext,
} from "../Component/ChatMessagePage";

const useListenMessage = () => {
  const { socket } = useSocketContext();
  console.log(
    socket + "Ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
  );
  const { messages, setMessages } = ChatMessagePage();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    return () => socket.off("newMessage");
  }, [socket]);
};

export default useListenMessage;*/
