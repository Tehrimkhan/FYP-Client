import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import AdsCards from "../Component/Banner/AdsCards";
import { API } from "../api/config";
import Background from "../Component/Background";
import Menu from "../Component/Menu";

const MyAdsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState(null);
  const [searchText, setSearchText] = useState("");

  const windowHeight = Dimensions.get("window").height;

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
      <View style={styles.bgcontainer}>
        <Background />
      </View>
      <View style={styles.innerContainer}>
        {isLoading ? (
          <View style={styles.spinnerContainer}>
            <Image
              source={require("../../assets/Spinner-1s-200px.gif")}
              style={{ width: 50, height: 50 }}
            />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              minHeight: windowHeight - 280, // Note: Make sure windowHeight is defined
            }}
          >
            {posts.length === 0 ? (
              <View style={styles.noPostsContainer}>
                <Image
                  source={require("../../assets/NFI.png")}
                  style={styles.noPostsImage}
                />
                <Text style={styles.npfText}>No Posts Found!</Text>
              </View>
            ) : (
              <AdsCards
                posts={posts}
                myPostScreen={true}
                searchText={searchText}
                sortOption={sortOption}
                isMyAdsPage={true} // Pass the prop indicating it's MyAdsPage
              />
            )}
          </ScrollView>
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
    position: "relative",
    backgroundColor: "#17171f",
  },
  bgcontainer: {
    position: "absolute",
  },

  innerContainer: {
    flex: 1,
    paddingTop: 220,
    marginBottom: 50,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomMenu: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: "#DDDDDD",
  },
  npfText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  noPostsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  noPostsImage: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
});

export default MyAdsPage;
