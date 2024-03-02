import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import AdsCards from "../Component/Banner/AdsCards";
import { API } from "../api/config";
import Background from "../Component/Background";
import Menu from "../Component/Menu";

const MyAdsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState(null);
  const [searchText, setSearchText] = useState("");
  const getUserPosts = async () => {
    try {
      const response = await API.get("/post/get-user-post");
      const userPosts = response?.data?.userPosts || [];
      setPosts(userPosts);
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
        {isLoading ? (
          <Image
            source={require("../../assets/Spinner-1s-200px.gif")}
            style={{ width: 50, height: 50 }}
          />
        ) : (
          <>
            {posts.length === 0 ? ( // Check if posts array is empty
              <Text style={styles.noPostText}>No posts found.</Text>
            ) : (
              <ScrollView>
                <AdsCards
                  posts={posts}
                  myPostScreen={true}
                  searchText={searchText}
                  sortOption={sortOption}
                />
              </ScrollView>
            )}
          </>
        )}
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
    //top: -90,
    top: -60,
  },

  scrollContainer: {
    height: 500,
    marginTop: 5,
    bottom: -20,
    // bottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  noPostText: {
    fontSize: 20,
    color: "gray",
    textAlign: "center",
    justifyContent: "center",
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
  scrollviewContainer: {
    height: 200,
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
