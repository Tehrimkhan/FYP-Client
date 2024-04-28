import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Menu = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const buttonWidth = screenWidth / 5;

  return (
    <View style={styles.menuContainer}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={[styles.buttonStyle, { width: buttonWidth }]}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <MaterialIcons
            name="home"
            size={20}
            color="white"
            style={styles.iconStyle}
          />
          <Text style={styles.textStyle}>HOME</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonStyle, { width: buttonWidth }]}
          onPress={() => navigation.navigate("ChatPage")}
        >
          <Entypo
            name="chat"
            size={20}
            color="white"
            style={styles.iconStyle}
          />
          <Text style={styles.textStyle}>CHATS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonStyle, { width: buttonWidth }]}
          onPress={() => navigation.navigate("SellerPage")}
        >
          <Ionicons
            name="add-circle"
            size={20}
            color="white"
            style={styles.iconStyle}
          />
          <Text style={styles.textStyle}>SELL</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonStyle, { width: buttonWidth }]}
          onPress={() => navigation.navigate("MyAdsPage")}
        >
          <FontAwesome5
            name="buysellads"
            size={20}
            color="white"
            style={styles.iconStyle}
          />
          <Text style={styles.textStyle}>MY ADS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonStyle, { width: buttonWidth }]} // Set the width dynamically
          onPress={() => navigation.navigate("MyPage")}
          // onPress={() => {
          //   localStorage.removeItem("@auth");
          //   navigation.navigate("YouPage");
          // }}
        >
          <FontAwesome
            name="user"
            size={20}
            color="white"
            style={styles.iconStyle}
          />
          <Text style={styles.textStyle}>YOU</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  mainContainer: {
    flexDirection: "row",
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 65,
    backgroundColor: "#9c80e7",
    top: 20,
  },
  textStyle: {
    fontWeight: "bold",
    top: 2,
  },
  iconStyle: {
    top: 2,
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#17171f",
    bottom: 5,
  },
});

export default Menu;
