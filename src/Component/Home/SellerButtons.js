import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const SellerButtons = ({ imageSource, placeholder, onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.searchbuttonStyle}>
          <View style={styles.buttonContent}>
            <View style={styles.circle}></View>
            <Image
              source={imageSource}
              style={styles.btnImageStyle}
              resizeMode="contain"
            />
            <Text style={styles.textStyle}>{placeholder}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    paddingHorizontal: 35,
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  searchbuttonStyle: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    borderRadius: 26,
    width: 342,
    height: 81,
    marginTop: 40,
    marginLeft: 20,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#2F2E41",
    position: "absolute",
    top: -10,
    left: 10,
  },
  btnImageStyle: {
    width: 60,
    height: 50,
    left: 10,
    bottom: 0,
  },
});

export default SellerButtons;
