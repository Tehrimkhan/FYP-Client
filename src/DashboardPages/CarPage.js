import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../Component/Home/SearchBar";
import carlogo from "../../assets/carlogo.png";
import Menu from "../Component/Menu";
import AdsCards from "../Component/Banner/AdsCards";
import { AuthContext } from "../context/authContext";
import Background from "../Component/Background";

const CarPage = ({ route }) => {
  const { carPosts } = route.params; // Extract carPosts from the route parameters
  const [userIdArray] = useContext(AuthContext); // Use AuthContext to get userId
  const userId = userIdArray?.data?.user?._id;

  // console.log("USER ID", userId);

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.searchContainer}>
        <SearchBar
          setSearchText={(value) => console.log(value)}
          imageSource={carlogo}
          placeholder="SEARCH YOUR CAR"
        />
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.lengthText}>Total Posts: {carPosts?.length}</Text>
        {/* Display the userId */}
        <View style={styles.scrollContainer}>
          <ScrollView>
            <AdsCards posts={carPosts} userId={userId} />
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
    top: 140,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  innerContainer: {
    // top: -15,
    top: -30,
  },
  scrollContainer: {
    height: 520,
    marginTop: 10,
    bottom: 10,
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

export default CarPage;
