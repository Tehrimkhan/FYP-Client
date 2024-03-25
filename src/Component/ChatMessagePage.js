import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Entypo, FontAwesome, AntDesign } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import { API } from "../api/config";

const ChatMessagePage = ({ route }) => {
  const navigation = useNavigation();
  const token = API.defaults.headers.common["Authorization"];
  const { recieverName, profileImage, receiverId } = route.params;
  const [userIdArray] = useContext(AuthContext);
  const userId = userIdArray?.data?.user?._id;
  // console.log("LoggedIn", userId);
  const [newMessage, setNewMessage] = useState("");
  const scrollViewRef = useRef();
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const renderMessages = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Image
            source={require("../../assets/Spinner-1s-200px.gif")}
            style={{ width: 50, height: 50 }}
          />
        </View>
      );
    }

    if (messages.length === 0) {
      return (
        <View style={styles.noMessagesContainer}>
          <Text style={styles.noMessagesText}>
            Send a message to start the conversation
          </Text>
        </View>
      );
    }

    return messages.map((msg, index) => {
      const isCurrentUser = msg.senderId === userId;

      const messageContainerWidth = Dimensions.get("window").width * 0.7;

      return (
        <View
          key={index}
          style={[
            styles.messageContainer,
            isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
            { width: messageContainerWidth },
          ]}
        >
          <View
            style={[
              styles.messageBubble,
              isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
            ]}
          >
            <Text style={styles.messageText}>{msg.message}</Text>
            <Text style={styles.messageTime}>
              {moment(msg.createdAt).format("LT")}
            </Text>
          </View>
        </View>
      );
    });
  };

  const [sendingMessage, setSendingMessage] = useState(false);

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const handleSend = async () => {
    try {
      setSendingMessage(true);
      if (!token || token.trim() === "") {
        alert("Authorization token missing. Please log in.");
        return;
      }
      const response = await API.post(
        `/messages/send/${receiverId}`,
        {
          message: newMessage,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const sentMessage = response.data;
      const senderId = sentMessage.senderId;
      setSenderId(senderId);
      setNewMessage("");
      setMessages((prevMessages) => [...prevMessages, sentMessage]);
      // console.log("Sender ID:", senderId);
    } catch (error) {
      console.error("Error sending message:", error.message);
    } finally {
      setSendingMessage(false);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (!token || token.trim() === "") {
          alert("Authorization token missing. Please log in.");
          return;
        }
        const response = await API.get(`/messages/${receiverId}`, {
          headers: {
            Authorization: token,
          },
        });

        const data = response.data;
        setMessages(data);
        // console.log("Messages", data);
      } catch (error) {
        console.error(error);
        alert("Error Getting Messages");
      } finally {
        setIsLoading(false);
      }
    };

    getMessages();
  }, [receiverId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
    Keyboard.dismiss();
  };

  const handleKeyboardShow = () => {
    setShowEmojiSelector(false);
  };
  const navigateToChatPage = () => {
    navigation.navigate("ChatPage");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={navigateToChatPage}>
            <AntDesign
              name="doubleleft"
              size={24}
              color="black"
              marginLeft={5}
            />
          </TouchableOpacity>
          {profileImage && profileImage.length > 0 ? (
            <Image
              source={{ uri: profileImage[0]?.secure_url }}
              style={styles.profileImage}
            />
          ) : (
            <Image
              source={require("../../assets/user.png")}
              style={styles.profileImage}
            />
          )}
          <Text style={styles.userName}>{recieverName}</Text>
        </View>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.messagesContainer}
        >
          {renderMessages()}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.emojiButton}
            onPress={handleEmojiPress}
          >
            <Entypo name="emoji-happy" size={24} color="#F9B700" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={newMessage + (selectedEmoji ? selectedEmoji : "")}
            onChangeText={setNewMessage}
            placeholder="Type your message..."
            placeholderTextColor="#aaa"
            multiline
            onFocus={handleKeyboardShow}
          />
          <View style={styles.sendButtonContainer}>
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <FontAwesome name="send-o" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showEmojiSelector && (
        <EmojiSelector onEmojiSelected={setSelectedEmoji} />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: "auto",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    marginLeft: 10,
  },
  messagesContainer: {
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
    maxWidth: "70%",
    maxHeight: 120,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 30,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    maxHeight: 50,
  },
  messageText: {
    fontSize: 17,
    color: "#FFFFFF",
  },
  messageTime: {
    fontSize: 12,
    color: "#ccc",
    marginTop: -5,
    marginRight: 5,
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 10,
  },
  emojiButton: {
    padding: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
    right: 1,
  },
  sendButtonContainer: {
    padding: 1,
    backgroundColor: "#20A090",
    borderRadius: 25,
  },
  noMessagesContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  noMessagesText: {
    fontSize: 16,
    color: "#aaa",
  },
  currentUserMessage: {
    alignSelf: "flex-end",
  },
  otherUserMessage: {
    alignSelf: "flex-start",
  },
  currentUserBubble: {
    backgroundColor: "#20A090",
  },
  otherUserBubble: {
    backgroundColor: "#29ABCA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ChatMessagePage;
