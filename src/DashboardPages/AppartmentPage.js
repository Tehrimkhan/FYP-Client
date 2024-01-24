import React, { useContext, useState, useEffect } from "react";
import SearchBar from "../Component/Home/SearchBar";
import applogo from "../../assets/apartlogo.png";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import Menu from "../Component/Menu";
import Background from "../Component/Background";
import AdsCards from "../Component/Banner/AdsCards";
import { AuthContext } from "../context/authContext";

// Your AppartmentPage component
const AppartmentPage = ({ route }) => {
  const { apartmentPosts } = route.params;
  // const [userIdArray] = useContext(AuthContext);
  // const userId = userIdArray?.data?.user?._id;
  const [
    userId,
    setUserId,
    userName,
    setUserName,
    userImage,
    setUserImage,
    userEmail,
    setUserEmail,
  ] = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarPosts = async () => {
      setIsLoading(true);
      // Replace the following line with your actual data fetching logic
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    fetchCarPosts();
  }, [searchText]); // Add searchText as a dependency

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.searchContainer}>
        <SearchBar
          setSearchText={(value) => setSearchText(value)}
          imageSource={applogo}
          placeholder="SEARCH YOUR APPARTMENT"
        />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.lengthText}>
            Total Posts: {apartmentPosts?.length}
          </Text>
        </View>
        <View style={styles.scrollContainer}>
          {isLoading ? (
            <Image
              source={require("../../assets/Spinner-1s-200px.gif")}
              style={{ width: 50, height: 50 }}
            />
          ) : (
            <ScrollView>
              <AdsCards
                posts={apartmentPosts}
                userId={userId}
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
    position: "absolute",
    top: 115,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  innerContainer: {
    top: -90,
  },
  textContainer: {
    top: 20,
  },
  scrollContainer: {
    height: 500,
    marginTop: 5,
    bottom: -20,
    // bottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  lengthText: {
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
});

export default AppartmentPage;
