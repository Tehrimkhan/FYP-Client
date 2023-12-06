import React, { useContext } from "react";
import SearchBar from "../Component/Home/SearchBar";
import applogo from "../../assets/apartlogo.png";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Menu from "../Component/Menu";
import Background from "../Component/Background";
import { PostContext } from "../context/postContext";
import AdsCards from "../Component/Banner/AdsCards";
import { AuthContext } from "../context/authContext";

const AppartmentPage = ({ route }) => {
  const { apartmentPosts } = route.params;
  const [userIdArray] = useContext(AuthContext);
  const userId = userIdArray?.data?.user?._id;
  // console.log("USER ID", userId);

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.searchContainer}>
        <SearchBar
          setSearchText={(value) => console.log(value)}
          imageSource={applogo}
          placeholder="SEARCH YOUR APPARTMENT"
        />
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.lengthText}>
          Total Posts: {apartmentPosts?.length}
        </Text>
        {/* Display the userId */}
        <View style={styles.scrollContainer}>
          <ScrollView>
            <AdsCards posts={apartmentPosts} userId={userId} />
          </ScrollView>
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
    top: 120,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  innerContainer: {
    top: -15,
  },
  scrollContainer: {
    height: 500,
    marginTop: 50,
    bottom: 40,
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
