import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Menu from "../Component/Menu";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { API } from "../api/config";
import { AuthContext } from "../context/authContext";
import moment from "moment";

const ChatPage = ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [userIdArray] = useContext(AuthContext);
  const userId = userIdArray?.data?.user?._id;
  const token = API.defaults.headers.common["Authorization"];
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getConversations = async () => {
      try {
        setIsLoading(true);
        if (!token || token.trim() === "") {
          alert("Authorization token missing. Please log in.");
          return;
        }
        const response = await API.get("/chatted-users", {
          headers: {
            Authorization: token,
          },
        });

        const data = response.data;
        setConversations(data.chattedUsers);
        // console.log("Conversations:", data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        alert("Error Getting Conversations");
        setIsLoading(false);
      }
    };

    getConversations();
  }, [isFocused]);

  const handleChatPress = (userName, userImage, userId) => {
    navigation.navigate("ChatMessagePage", {
      recieverName: userName,
      profileImage: userImage,
      receiverId: userId,
    });
  };

  const SearchUsers = () => {
    navigation.navigate("SearchUsersPage");
  };

  const filteredConversations =
    conversations && conversations.length > 0
      ? conversations.filter((user) =>
          user.participant.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : [];

  useEffect(() => {
    if (!isFocused) {
      setSearchQuery("");
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chats</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.searchIconContainer}
          onPress={() => navigation.navigate("ChatPage", { searchQuery })}
        >
          <FontAwesome name="search" size={20} color="#666" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Image
              source={require("../../assets/Spinner-1s-200px.gif")}
              style={styles.loadingImage}
            />
          </View>
        ) : (
          filteredConversations.map((user, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                handleChatPress(
                  user.participant?.name || "",
                  user.participant?.profileImage || "",
                  user.participant?._id || ""
                )
              }
            >
              <View style={styles.chatBubble}>
                {user.participant &&
                user.participant.profileImage &&
                user.participant.profileImage.length > 0 ? (
                  <Image
                    source={{
                      uri: user.participant.profileImage[0]?.secure_url,
                    }}
                    style={styles.userImage}
                  />
                ) : (
                  <Image
                    source={require("../../assets/user.png")}
                    style={styles.userImage}
                  />
                )}
                <View style={styles.messageContainer}>
                  <Text style={styles.user}>
                    {user.participant?.name || ""}
                  </Text>
                  <Text style={styles.message}>{user.lastMessage || ""}</Text>
                </View>
                <Text style={styles.time}>
                  {moment(user.lastMessageTimestamp).format("LT")}
                </Text>
              </View>
              <View style={styles.line} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => SearchUsers()}>
        <Entypo name="plus" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={styles.menu}>
        <Menu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: "#33CCCC",
    padding: 15,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontFamily: "appfont",
    fontSize: 35,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
  },
  searchIconContainer: {
    padding: 10,
  },
  chatContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flex: 1,
  },
  chatBubble: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageContainer: {
    flex: 1,
  },
  user: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {},
  time: {
    marginTop: 20,
    marginLeft: 10,
    color: "gray",
  },
  line: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menu: {
    marginBottom: 20,
  },
  addButton: {
    position: "absolute",
    bottom: 65,
    right: 20,
    backgroundColor: "#33CCCC",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingImage: {
    width: 50,
    height: 50,
  },
});

export default ChatPage;
