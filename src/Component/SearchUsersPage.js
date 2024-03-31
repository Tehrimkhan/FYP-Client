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
import { FontAwesome } from "@expo/vector-icons";
import { API } from "../api/config";
import { AuthContext } from "../context/authContext";

const SearchUsersPage = ({ allUsers, onSearch }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [userIdArray] = useContext(AuthContext);
  const userId = userIdArray?.data?.user?._id;
  const token = API.defaults.headers.common["Authorization"];
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getConversations = async () => {
      try {
        if (!token || token.trim() === "") {
          alert("Authorization token missing. Please log in.");
          return;
        }
        const response = await API.get("/msgProfile", {
          headers: {
            Authorization: token,
          },
        });

        const data = response.data;
        setConversations(data.filteredUsers);
        console.log("Conversations:", data);
      } catch (error) {
        console.error(error);
        alert("Error Getting Conversations");
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

  const filteredConversations = conversations.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (!isFocused) {
      setSearchQuery("");
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
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
        {searchQuery === "" ? (
          <View style={styles.centeredMessage}>
            <Text>Start Searcing...</Text>
          </View>
        ) : filteredConversations.length === 0 ? (
          <View style={styles.centeredMessage}>
            <Text>No results found</Text>
          </View>
        ) : (
          filteredConversations.map((user, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                handleChatPress(user.name, user.profileImage, user._id)
              }
            >
              <View style={styles.chatBubble}>
                {user.profileImage && user.profileImage.length > 0 ? (
                  <Image
                    source={{ uri: user.profileImage[0]?.secure_url }}
                    style={styles.userImage}
                  />
                ) : (
                  <Image
                    source={require("../../assets/user.png")}
                    style={styles.userImage}
                  />
                )}
                <View style={styles.messageContainer}>
                  <Text style={styles.user}>{user.name}</Text>
                </View>
              </View>
              <View style={styles.line} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    justifyContent: "space-between",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 50,
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
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  messageContainer: {
    flex: 1,
  },
  user: {
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 7,
    fontSize: 17,
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
  centeredMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchUsersPage;
