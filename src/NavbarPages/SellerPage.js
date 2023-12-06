import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SellerButtons from "../Component/Home/SellerButtons";
import carlogo from "../../assets/carlogo.png";
import apartlogo from "../../assets/apartlogo.png";
import applogo from "../../assets/applogo.png";
import furnlogo from "../../assets/furnlogo.png";
import Menu from "../Component/Menu";

const SellerPage = ({ navigation }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const backButton = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.bgContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => backButton()}>
          <Ionicons name="arrow-back-circle-sharp" size={25} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>WHAT ARE YOU OFFERING?</Text>
      </View>
      <View style={styles.btnContainer}>
        <SellerButtons
          onPress={() => navigateToScreen("CarAdPage")} // Navigate to CarScreen on button press
          imageSource={carlogo}
          placeholder="ADD YOUR CAR"
        />
        <SellerButtons
          onPress={() => navigateToScreen("apparelAdPage")} // Navigate to ApparelScreen on button press
          imageSource={applogo}
          placeholder="ADD YOUR APPARELS"
        />
        <SellerButtons
          onPress={() => navigateToScreen("appartmentAdPage")} // Navigate to ApartmentScreen on button press
          imageSource={apartlogo}
          placeholder="ADD YOUR APPARTMENT"
        />
        <SellerButtons
          onPress={() => navigateToScreen("furnitureAdPage")} // Navigate to FurnitureScreen on button press
          imageSource={furnlogo}
          placeholder="ADD YOUR FURNITURE"
        />
      </View>
      <Menu />
    </View>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: "#D2C6C6",
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    top: -30,
    flexDirection: "row",
    backgroundColor: "#8A7A7A",
    height: 55,
    width: 360,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 15,
    marginLeft: 50,
  },
  btnContainer: {
    right: 10,
  },
});

export default SellerPage;