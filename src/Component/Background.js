import React from "react";
import { StyleSheet, View, Image } from "react-native";

const headlogo = require("../../assets/download.png");
const header = require("../../assets/header.png");

const Background = () => {
  return (
    <View style={styles.bgContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={headlogo}
            style={styles.headStyle}
            resizeMode="contain"
          />
        </View>
        <Image
          source={header}
          style={styles.headerImageStyle}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  headerContainer: {
    // backgroundColor: "#F2F2F2",
    // justifyContent: "center",
    // alignItems: "center",
    // top: 920, // Set the height according to your design
    // position: "relative",
    // backgroundColor: "pink",
  },
  headStyle: {
    width: 200,
    height: 157,
    // marginBottom: 20,
  },
  imageContainer: {
    // position: "absolute",
    // top: 0, // Adjust the top position if needed
    // left: -50,
    // backgroundColor: "yellow",
  },
  headerImageStyle: {
    width: 260,
    height: 100, // Set the height of your header image
    // marginTop: -600,
    bottom: 130,
    left: 65,
  },
});

export default Background;
