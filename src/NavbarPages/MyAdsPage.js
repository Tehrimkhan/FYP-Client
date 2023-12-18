import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import AdsCards from "../Component/Banner/AdsCards";
import { API } from "../api/config";
import Background from "../Component/Background";
import Menu from "../Component/Menu";

const MyAdsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const getUserPosts = async () => {
    try {
      const response = await API.get("/post/get-user-post");
      setPosts(response?.data?.userPosts);
      setIsLoading(false);
    } catch (error) {
      console.error("Error Fetching User Posts:", error);
      alert("Error fetching user posts");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);
  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.searchContainer}>
        <Text style={styles.heading}>MY ADS</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.lengthText}>Total Posts: {posts?.length}</Text>
        <View style={styles.scrollContainer}>
          {isLoading ? (
            // Display a loading image or indicator
            <Image
              source={require("../../assets/Spinner-1s-200px.gif")}
              style={{ width: 50, height: 50 }}
            />
          ) : (
            <ScrollView>
              <AdsCards
                posts={posts}
                myPostScreen={true}
                searchText={searchText}
              />
            </ScrollView>
          )}
        </View>
      </View>
      <View style={styles.bottomMenu}>
        <Menu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: "#D8D6F7",
    position: "absolute",
    top: 155,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 26,
    width: 375,
    left: 8,
    height: 81,
  },
  innerContainer: {
    top: -190,
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 294,
    marginTop: 50,
    bottom: 40,
  },
  lengthText: {
    top: 15,
    left: 25,
  },
  heading: {
    fontSize: 30,
    fontFamily: "appfont",
    color: "#FAFBFF",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  bottomMenu: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: "#DDDDDD",
  },
});

export default MyAdsPage;
