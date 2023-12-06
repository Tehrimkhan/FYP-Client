import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Background from "../Component/Background";
import SelectImage from "../Component/SelectImage";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/authContext";
import { API } from "../api/config";

const AppartmentAdPage = () => {
  const [title, setTitle] = useState("Apartment");
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [rent, setRent] = useState("");
  const [description, setDescription] = useState("");
  const [postImages, setpostImages] = useState([]);
  const [state] = useContext(AuthContext);
  const token = state.data.token;

  const handleImagesSelected = (imageURIs) => {
    console.log("Selected Images:", imageURIs);
  };

  const handleSubmit = async (token) => {
    try {
      if (!name || !area || !floor || !room || !rent || !description) {
        alert("Please Fill All Post Fields!");
      } else {
        const data = await API.post("/post/create-post", {
          postImages,
          title,
          name,
          area,
          floor,
          room,
          rent,
          description,
        });
        alert(data?.data.message);
        navigation.navigate("Dashboard");
      }
    } catch (error) {
      alert(error.data ? error.data.data.message : "Unknown error occurred");
      console.log(error);
    }
  };
  return (
    <View>
      <Background />
      <ScrollView style={styles.container}>
        {/* Display selected images */}
        {/* Image upload section */}
        <SelectImage onImagesSelected={handleImagesSelected} />
        {/* Set the title as read-only */}
        <TextInput
          style={styles.input}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder="Enter Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setArea(text)}
          value={area}
          placeholder="Enter Area"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFloor(text)}
          value={floor}
          placeholder="Enter Floor"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setRoom(text)}
          value={room}
          placeholder="Enter Rooms"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setRent(text)}
          value={rent}
          placeholder="Enter Rent"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setDescription(text)}
          value={description}
          placeholder="Enter Description"
          multiline={true}
          numberOfLines={6}
        />

        {/* Submit button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => handleSubmit(token)}
        >
          <MaterialIcons name="add-box" size={24} color="black" />
          <Text style={styles.buttonText}>CREATE POST</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    resizeMode: "cover",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: "appfont",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#32A1A8",
    borderRadius: 5,
    paddingVertical: 10, // Adjust vertical padding as needed
    paddingHorizontal: 20, // Adjust horizontal padding as needed
  },
  button: {
    marginLeft: 5, // Add left margin to create space between icon and text
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DABFBF",
    borderRadius: 5,
    height: 80,
    marginBottom: 5,
    paddingVertical: 10, // Adjust vertical padding as needed
    paddingHorizontal: 20, // Adjust horizontal padding as needed
  },
  buttonText: {
    marginLeft: 5, // Add left margin to create space between icon and text
    fontFamily: "appfont",
    fontSize: 18,
    color: "white",
  },
});

export default AppartmentAdPage;
