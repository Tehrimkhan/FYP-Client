import React from "react";
import SearchBar from "../Component/Home/SearchBar";
import applogo from "../../assets/applogo.png";
import { View, Text, StyleSheet, Image } from "react-native";
import Menu from "../Component/Menu";

const headlogo = require("../../assets/download.png");
const header = require("../../assets/header.png");

const ApparelsPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={headlogo} style={styles.headLogo} resizeMode="contain" />
        <View style={styles.headerContainer}>
          <Image
            source={header}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <SearchBar
          setSearchText={(value) => console.log(value)}
          imageSource={applogo}
          placeholder="SEARCH YOUR APPARELS"
        />
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
    justifyContent: "center",
    alignItems: "center",
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: -2,
    left: -3,
  },
  headLogo: {
    width: 200,
    height: 200,
    margin: 10,
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    width: 300, // Adjust the width of your header image
    height: 70, // Adjust the height of your header image
    left: -110, // Center the header image
  },
  searchContainer: {
    position: "absolute",
    top: 120, // Adjust the top value to position the SearchBar below the headerImage
    width: "100%", // Set the width to occupy the full screen width
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  bottomMenu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: "#DDDDDD",
  },
});
export default ApparelsPage;
