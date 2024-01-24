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
} from "react-native";
import Background from "../Component/Background";
import SelectImage from "../Component/SelectImage";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/authContext";
import { API } from "../api/config";
import { loadStripe } from "@stripe/stripe-js";
import Menu from "../Component/Menu";
import { useImageUpload } from "../utils/helpers";

const ApparelAdPage = ({ navigation }) => {
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

  const handleSubmit = async () => {
    if (!postImages) {
      console.log("No image selected");
      return;
    }

    setIsLoading(true);

    let _file = {
      uri: postImages,
      name: "IMG_" + Math.random(4000) + ".png",
      type: "image/png",
    };

    try {
      const imageResponse = await uploadImage(_file, setProgress);
      console.log("Cloudinary response sent to the backend", imageResponse);

      if (!make || !name || !model || !variant || !rent || !description) {
        Alert.alert("Please Fill All Post Fields!");
      } else {
        const createPostResponse = await API.post(
          "/post/create-post",
          {
            postImages: imageResponse,
            title,
            name,
            model,
            make,
            variant,
            rent,
            description,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        Alert.alert(createPostResponse?.data.message);
        Alert.alert("Post Will Be Published After Admin Approval");

        navigation.navigate("Dashboard");
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
      <Background />
      <ScrollView style={styles.container}>
        <View style={styles.Selectioncontainer}>
          <SelectImage onSelectImage={handleImageSelect} />
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
    top: 100,
    padding: 20,
    resizeMode: "cover",
  },
  Selectioncontainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  uploadBtnContainer: {
    height: 50,
    width: 173,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
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
    width: 350,
    height: 200,
    resizeMode: "cover",
    overflow: "hidden",
    borderRadius: 25,
    marginBottom: 10,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#32A1A8",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    marginLeft: 5,
    fontFamily: "appfont",
    fontSize: 18,
    color: "white",
  },
  menuContainer: {
    bottom: -290,
  },
});
export default ApparelAdPage;
