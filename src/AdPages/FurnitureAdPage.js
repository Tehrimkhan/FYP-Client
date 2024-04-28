import React, { useState, useContext, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  ScrollView,
  Keyboard,
  Platform,
} from "react-native";
import Background from "../Component/Background";
import SelectImage from "../Component/SelectImage";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/authContext";
import { API } from "../api/config";
import Menu from "../Component/Menu";
import { useImageUpload } from "../utils/helpers";

const FurnitureAdPage = () => {
  const [postImages, setpostImages] = useState("");
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("Furniture");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [style, setStyle] = useState("");
  const [rent, setRent] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [state] = useContext(AuthContext);
  const token = state.data.token;

  const { uploadImage } = useImageUpload();

  const handleImageSelect = (uri) => {
    setpostImages(uri);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const scrollViewRef = useRef();

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

      if (!name || !color || !material || !style || !rent || !description) {
        Alert.alert("Please Fill All Post Fields!");
      } else {
        const createPostResponse = await API.post(
          "/post/create-post",
          {
            postImages: imageResponse,
            title,
            name,
            color,
            material,
            style,
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
      <View style={styles.backgroundContainer}>
        <Background />
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerContainer}>
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
            placeholder="Enter Name.."
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setColor(text)}
            value={color}
            placeholder="Enter Color.."
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setMaterial(text)}
            value={material}
            placeholder="Enter Material.."
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setStyle(text)}
            value={style}
            placeholder="Enter Style.."
          />
          <TextInput
            style={[styles.input]} // Update color to white
            onChangeText={(text) => setRent(text)}
            value={rent}
            placeholder="Enter Rent.."
          />
          <TextInput
            style={[styles.descinput]} // Update color to white
            onChangeText={(text) => setDescription(text)}
            value={description}
            placeholder="Enter Description.."
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
        </View>
      </ScrollView>
      <View style={styles.menuContainer}>
        <Menu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  innerContainer: {
    paddingTop: 150,
  },
  Selectioncontainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  backgroundContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    borderColor: "#fff",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontFamily: "appfont",
    color: "#fff", // Remove or comment this line
  },
  descinput: {
    height: 60,
    borderColor: "#fff",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontFamily: "appfont",
    color: "#fff", // Remove or comment this line
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9c80e7",
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
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: "#DDDDDD",
    height: 50,
  },
});
export default FurnitureAdPage;
