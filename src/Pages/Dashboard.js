import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Menu from "../Component/Menu";
import Banner from "../Component/Banner/DashboardBanner";
import { PostContext } from "../context/postContext";

const headlogo = require("../../assets/download.png");
const header = require("../../assets/header.png");
const carlogo = require("../../assets/carlogo.png");
const applogo = require("../../assets/applogo.png");
const apartlogo = require("../../assets/apartlogo.png");
const furnlogo = require("../../assets/furnlogo.png");

const Dashboard = ({ navigation }) => {
  const [posts] = useContext(PostContext);

  const filteredCarPosts = posts.filter((post) => post.title === "Car");
  const filteredAppartmentPosts = posts.filter(
    (post) => post.title === "Apartment"
  );

  const submitCar = () => {
    navigation.navigate("CarPage", { carPosts: filteredCarPosts });
  };
  const submitApparels = () => {
    navigation.navigate("ApparelsPage");
  };
  const submitAppartment = () => {
    navigation.navigate("AppartmentPage", {
      apartmentPosts: filteredAppartmentPosts,
    });
  };
  const submitFurniture = () => {
    navigation.navigate("FurniturePage");
  };
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
      <View style={styles.sliderContainer}>
        <Banner />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.carbuttonStyle}
          onPress={() => submitCar()}
        >
          <View style={styles.buttonContent}>
            <View style={styles.circle}></View>
            <Image
              source={carlogo}
              style={styles.btnImageStyle}
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>SUBSCRIBE YOUR CAR</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.appbuttonStyle}
          onPress={() => submitApparels()}
        >
          <View style={styles.buttonContent}>
            <View style={styles.circle}></View>
            <Image
              source={applogo}
              style={styles.btnImageStyle}
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>SUBSCRIBE YOUR APPARELS</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.apartbuttonStyle}
          onPress={() => submitAppartment()}
        >
          <View style={styles.buttonContent}>
            <View style={styles.circle}></View>
            <Image
              source={apartlogo}
              style={styles.btnImageStyle}
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>SUBSCRIBE YOUR APPARTMENT</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.furnbuttonStyle}
          onPress={() => submitFurniture()}
        >
          <View style={styles.buttonContent}>
            <View style={styles.circle}></View>
            <Image
              source={furnlogo}
              style={styles.btnImageStyle}
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>SUBSCRIBE YOUR FURNITURE</Text>
          </View>
        </TouchableOpacity>
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
    margin: 20,
    //Added
    left: -30,
    bottom: 40,
  },
  headerContainer: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    width: 300, // Adjust the width of your header image
    height: 70, // Adjust the height of your header image
    //left: -110, // Center the header image
    left: -180,
    bottom: 20,
  },
  sliderContainer: {
    marginTop: 80,
    //Added
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  carbuttonStyle: {
    backgroundColor: "#D8D6F7",
    borderRadius: 26,
    paddingVertical: 29,
    width: 340,
    height: 81,
    marginBottom: 10,
  },
  appbuttonStyle: {
    backgroundColor: "#FED9EB",
    borderRadius: 26,
    paddingVertical: 29,
    width: 340,
    height: 81,
    marginBottom: 10,
  },
  apartbuttonStyle: {
    backgroundColor: "#B3DFAC",
    borderRadius: 26,
    paddingVertical: 29,
    width: 340,
    height: 81,
    marginBottom: 10,
  },
  furnbuttonStyle: {
    backgroundColor: "#FFE2AA",
    borderRadius: 26,
    paddingVertical: 29,
    width: 340,
    height: 81,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "appfont",
    color: "black",
    marginLeft: 25,
    marginBottom: 27,
  },
  btnImageStyle: {
    width: 60,
    height: 50,
    left: 10,
    bottom: 15,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    position: "absolute",
    top: -24,
    left: 10,
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

export default Dashboard;
