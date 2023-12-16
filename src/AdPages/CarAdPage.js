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
import { loadStripe } from "@stripe/stripe-js";
import Menu from "../Component/Menu";

const stripePromise = loadStripe(
  "pk_test_51OBalnCqGjyjTkAY9dTa4EdIxHfyluvV2pJtbExYurNHYgerZ0v3wnM4kz97bbIfgQ55YRbGPAqpxphvx0K6R2AC00CdB5YbIX"
);

const CarAdPage = ({ navigation }) => {
  const [title, setTitle] = useState("Car");
  const [make, setMake] = useState("");
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const [rent, setRent] = useState("");
  const [description, setDescription] = useState("");
  const [postImages, setpostImages] = useState([]);
  const [state] = useContext(AuthContext);
  const token = state.data.token;

  const handleImagesSelected = (imageURIs) => {
    console.log("Selected Images:", imageURIs);
  };

  const handleSubmit = async () => {
    try {
      if (!make || !name || !model || !variant || !rent || !description) {
        alert("Please Fill All Post Fields!");
      } else {
        const paymentData = {
          make,
          name,
          model,
          variant,
          rent,
          description,
        };

        navigation.navigate("PaymentPage", { paymentData });
      }
    } catch (error) {
      alert(
        error.response ? error.response.data.message : "Unknown error occurred"
      );
      console.error(error);
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
          onChangeText={(text) => setMake(text)}
          value={make}
          placeholder="Enter Make"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setModel(text)}
          value={model}
          placeholder="Enter Model"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setVariant(text)}
          value={variant}
          placeholder="Enter Variant"
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
          <MaterialIcons name="add-box" size={24} color="white" />
          <Text style={styles.buttonText}>CREATE POST</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.menuContainer}>
        <Menu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 150,
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
  menuContainer: {
    top: 295,
  },
});

export default CarAdPage;
