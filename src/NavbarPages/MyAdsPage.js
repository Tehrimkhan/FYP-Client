import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  Dimensions,
} from "react-native";
import Menu from "../Component/Menu";
import headlogo from "../../assets/download.png";
import header from "../../assets/header.png";
import AdsCards from "../Component/Banner/AdsCards";
import { API } from "../api/config";
import Background from "../Component/Background";

const { width } = Dimensions.get("window");
const MyAdsPage = () => {
  //STATE
  const [posts, setPosts] = useState([]);
  const getUserPosts = async () => {
    try {
      const response = await API.get("/post/get-user-post");
      setPosts(response?.data?.userPosts);
    } catch (error) {
      console.error("Error Fetching User Posts:", error);
      alert("Error fetching user posts");
    }
  };
  //initial
  useEffect(() => {
    getUserPosts();
  }, []);
  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.searchContainer}>
        <Text style={styles.heading}>MY ADS</Text>
      </View>
      <Text style={styles.lengthText}>Total Posts: {posts?.length}</Text>
      <ScrollView style={styles.scrollContainer}>
        <AdsCards posts={posts} myPostScreen={true} />
        {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
      </ScrollView>
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
    top: 160,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 26,
    width: 375,
    left: 8,
    height: 81,
  },
  scrollContainer: {
    height: 294,
    marginTop: 50,
    bottom: 40,
    left: 25,
  },
  lengthText: {
    top: 10,
    left: 25,
  },
  bottomMenu: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: "#DDDDDD",
  },
  // container: {
  //   flex: 1,
  // },
  // topContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   position: "absolute",
  //   top: -32,
  //   left: -9,
  // },
  // headLogo: {
  //   width: 200,
  //   height: 200,
  //   margin: 10,
  // },
  heading: {
    fontSize: 30,
    fontFamily: "appfont",
    color: "#FAFBFF",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  // headingContainer: {
  //   backgroundColor: "#D8D6F7",
  //   display: "flex",
  //   top: 150,
  //   flexDirection: "row",
  //   gap: 5,
  //   alignItems: "center",
  //   borderRadius: 26,
  //   width: 375,
  //   height: 81,
  //   marginBottom: -110,
  // },
  // headerContainer: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   right: 50,
  // },
  // headerImage: {
  //   width: 300, // Adjust the width of your header image
  //   height: 70, // Adjust the height of your header image
  //   left: -110, // Center the header image
  // },
  // searchContainer: {
  //   position: "absolute",
  //   top: 100, // Adjust the top value to position the SearchBar below the headerImage
  //   width: "100%", // Set the width to occupy the full screen width
  //   justifyContent: "center",
  //   alignItems: "center",
  //   padding: 20,
  // },
  // bottomMenu: {
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   borderTopWidth: 2,
  //   borderTopColor: "#DDDDDD",
  // },
  // searchStyle: {
  //   fontSize: 30,
  // },
  // innerContainer: {
  //   height: 294,
  //   width: 338,
  //   backgroundColor: "#D9D9D9",
  //   borderRadius: 25, // Updated: Removed quotes around the value
  //   marginBottom: 20,
  // },
  // innerContainerBox: {
  //   width: 302,
  //   height: 71,
  //   backgroundColor: "#FFFFFF",
  //   borderRadius: 25, // Updated: Removed quotes around the value
  //   marginTop: 25,
  //   marginLeft: 20,
  // },

  // innerContainerText: {
  //   color: "black",
  //   fontWeight: "bold",
  //   textAlign: "center",
  // },
  // scrollContainer: {
  //   height: 294,
  //   marginTop: 250,
  // },
  // cardContainer: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   width,
  // },
  // card: {
  //   width: width * 0.99,
  //   height: width * 0.5,
  //   resizeMode: "cover",
  //   borderRadius: 8,
  //   overflow: "hidden",
  // },
  // sliderContainer: {
  //   backgroundColor: "#D9D9D9", // Set the background color here for the Carousel
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginTop: 10,
  // },
  // titleHeading: {
  //   fontSize: 18,
  //   fontFamily: "appfont",
  // },
  // innerTextContainer: {
  //   width: 302,
  //   height: 71,
  //   backgroundColor: "white",
  //   borderRadius: 25,
  //   left: 18,
  // },
  // titleContainer: {
  //   flexDirection: "row",
  //   left: 15,
  //   top: 10,
  //   fontWeight: "bold",
  // },
  // titlerentHeading: {
  //   fontSize: 15,
  //   top: 4,
  //   fontWeight: "bold",
  // },
  // postDetailsContainer: {
  //   flex: 1,
  //   flexDirection: "row",
  //   justifyContent: "flex-end",
  // },
  // postDetailsText: {
  //   textAlign: "right",
  //   top: 25,
  //   right: 20,
  // },
  // lengthText: {
  //   top: 250,
  //   right: 140,
  // },
});

export default MyAdsPage;
