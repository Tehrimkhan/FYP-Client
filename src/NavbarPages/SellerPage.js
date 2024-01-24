import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SellerButtons from "../Component/Home/SellerButtons";
import carlogo from "../../assets/carlogo.png";
import apartlogo from "../../assets/apartlogo.png";
import applogo from "../../assets/applogo.png";
import furnlogo from "../../assets/furnlogo.png";
import Menu from "../Component/Menu";
import Background from "../Component/Background";

const SellerPage = ({ navigation }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const backButton = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.bgContainer}>
      <Background />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => backButton()}>
          <Ionicons name="arrow-back-circle-sharp" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>WHAT ARE YOU OFFERING?</Text>
      </View>
      <View style={styles.btnContainer}>
        <SellerButtons
          onPress={() => navigateToScreen("CarAdPage")}
          imageSource={carlogo}
          placeholder="ADD YOUR CAR"
        />
        <SellerButtons
          onPress={() => navigateToScreen("ApparelAdPage")}
          imageSource={applogo}
          placeholder="ADD YOUR APPARELS"
        />
        <SellerButtons
          onPress={() => navigateToScreen("appartmentAdPage")}
          imageSource={apartlogo}
          placeholder="ADD YOUR APPARTMENT"
        />
        <SellerButtons
          onPress={() => navigateToScreen("furnitureAdPage")}
          imageSource={furnlogo}
          placeholder="ADD YOUR FURNITURE"
        />
      </View>
      <View style={styles.menuContainer}>
        <Menu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    position: "relative", // Change to relative
    backgroundColor: "#f0f0f0",
  },
  headerContainer: {
    flexDirection: "row",

    height: 55,
    width: "100%", // Change to 100%
    alignItems: "center",
    paddingHorizontal: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    position: "absolute", // Position absolutely at the top
    top: 170,
    left: 0,
    right: 0,
  },
  headerText: {
    color: "#9d626b",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 60,
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center", // Center buttons vertically
    alignItems: "center", // Center buttons horizontally
    marginBottom: 200,
    right: 10,
  },
  menuContainer: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: "#DDDDDD",
  },
});

export default SellerPage;
