import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Rating = ({ rating, onRatingChange }) => {
  const handleRating = (value) => {
    onRatingChange(value); // Pass rating value to parent component
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleRating(index)}
            style={styles.starButton}
          >
            <Ionicons
              name={index <= rating ? "star" : "star-outline"}
              size={30}
              color={index <= rating ? "#FFD700" : "#CCCCCC"}
            />
          </TouchableOpacity>
        ))}
      </View>
      {/* <Text style={styles.title}>Rating: {rating}/5</Text> */}
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    top: 5,
    left: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  starsContainer: {
    flexDirection: "row",
  },
  starButton: {
    padding: 5,
  },
});
