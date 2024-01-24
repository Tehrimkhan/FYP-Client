import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Background from "../Component/Background";
import SelectImage from "../Component/SelectImage";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/authContext";
import { API } from "../api/config";
import { useImageUpload } from "../utils/helpers";
import Menu from "../Component/Menu";
const { height } = Dimensions.get("window");
const CarAdPage = ({ navigation }) => {
  const [postImages, setpostImages] = useState("");
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("Car");
  const [make, setMake] = useState("");
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const [rent, setRent] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [state] = useContext(AuthContext);
  const token = state.data.token;

  const { uploadImage } = useImageUpload();

  const handleImageSelect = (uri) => {
    setpostImages(uri);
  };

  const handleImageUpload = async () => {
    if (!postImages) {
      console.log("No image selected");
      return null; // Return null or handle it differently based on your needs
    }

    let _file = {
      uri: postImages,
      name: "IMG_" + Math.random(4000) + ".png",
      type: "image/png",
    };

    try {
      const imageResponse = await uploadImage(_file, setProgress);
      return imageResponse;
    } catch (error) {
      console.error("Image Upload Error:", error);
      return null; // Handle the error or return null based on your needs
    }
  };

  const handlePayment = async () => {
    // Your existing payment logic
    const paymentData = {
      make,
      name,
      model,
      variant,
      rent,
      description,
    };

    navigation.navigate("PaymentPage", { paymentData });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const imageResponse = await handleImageUpload();

      if (!make || !name || !model || !variant || !rent || !description) {
        Alert.alert("Please Fill All Post Fields!");
      } else {
        const paymentData = {
          make,
          name,
          model,
          variant,
          rent,
          description,
        };

        if (imageResponse) {
          paymentData.postImages = imageResponse;
        }

        handlePayment(paymentData);
      }
    } catch (error) {
      Alert.alert(
        error.response ? error.response.data.message : "Unknown error occurred"
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <View style={styles.backgroundContainer}>
        <Background />
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.Selectioncontainer}>
          {!postImages && <SelectImage onSelectImage={handleImageSelect} />}
        </View>
        {postImages ? (
          <Image source={{ uri: postImages }} style={styles.image} />
        ) : null}

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

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => handleSubmit(token)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <>
              <MaterialIcons name="add-box" size={24} color="white" />
              <Text style={styles.buttonText}>CREATE POST</Text>
            </>
          )}
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
    padding: 30,
  },
  Selectioncontainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  backgroundContainer: {
    flex: 1,
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    overflow: "hidden",
    borderRadius: 15,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontFamily: "appfont",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#32A1A8",
    borderRadius: 5,
    paddingVertical: 10,
  },
  buttonText: {
    marginLeft: 5,
    fontFamily: "appfont",
    fontSize: 18,
    color: "white",
  },
  menuContainer: {
    position: "absolute",
    bottom: -320,

    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: "#DDDDDD",
    height: 50, // Adjust the height of the menu container
  },
});
export default CarAdPage;
