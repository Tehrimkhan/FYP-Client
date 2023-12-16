import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

const logo = require("../assets/logoW.png");
const headlogo = require("../assets/download.png");
const midImage = require("../assets/mainpageImage.png");

const MainPage = ({ navigation }) => {
  const submit = () => {
    navigation.navigate("LoginPage");
  };

  return (
    <View style={styles.bgContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={headlogo}
          style={styles.headStyle}
          resizeMode="contain"
        />
      </View>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.header}>FLEX SHARE</Text>
      <Text style={styles.lowerheader}>LET’S SUBSCRIBE</Text>
      <Image source={midImage} style={styles.midImage} resizeMode="contain" />
      <Text style={styles.lowertext}>YOUR FLEXIBLE SUBSCRIPTION PLATFORM</Text>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={() => submit()}>
          <Text style={styles.buttonStyle}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    position: "absolute",
    bottom: "69%",
    left: 0,
  },
  headStyle: {
    top: -10,
    width: 210,
    height: 300,
  },
  headerContainer: {
    width: 250,
    height: 250,
    bottom: 270,
  },
  headerImageStyle: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    color: "rgba(0, 0, 0, 0.81)",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "700",
  },
  lowerheader: {
    color: "rgba(0, 0, 0, 0.58)",
    fontSize: 14,
    marginBottom: 50,
    fontWeight: "bold",
  },
  lowertext: {
    color: "black",
    fontSize: 14,
    marginBottom: 55,
    fontWeight: "bold",
  },
  midImage: {
    width: 400,
    height: 300,
  },
  logo: {
    display: "flex",
    width: 110,
    height: 91,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  mainContainer: {
    height: "100%",
  },
  innerContainer: {
    borderRadius: 10,
    padding: 20,
  },
  mainHeader: {
    borderRadius: 10,
    paddingHorizontal: 100,
    justifyContent: "center",
    fontFamily: "serif",
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonStyle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#32A1A8",
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 100,
  },
});

export default MainPage;
