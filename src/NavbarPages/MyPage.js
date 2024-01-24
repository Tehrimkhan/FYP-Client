import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Background from "../Component/Background";
import * as ImagePicker from "expo-image-picker";
import { API } from "../api/config";
import Menu from "../Component/Menu";
import { useImageUpload } from "../utils/helpers";
import { AuthContext } from "../context/authContext";

const MyPage = () => {
  const [profileImage, setProfileImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userIdArray] = useContext(AuthContext);
  const userId = userIdArray?.data?.user?._id;

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const response = await API.get("/profile");
      const { user } = response.data;

      setUserName(user.name);
      setUserEmail(user.email);

      if (user.profileImage && user.profileImage.length > 0) {
        setProfileImage(user.profileImage[0].secure_url);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const openImageLibrary = async () => {
    try {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: false,
      });

      if (!response.cancelled) {
        // console.log(response);
        setProfileImage(response.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image", error);
    }
  };

  const { uploadImage } = useImageUpload();
  const uploadProfileImage = async () => {
    if (!profileImage) {
      console.log("No image selected");
      return;
    }

    let _file = {
      uri: profileImage,
      name: "IMG_" + Math.random(4000) + ".png",
      type: "image/png",
    };

    const token = API.defaults.headers.common["Authorization"];

    try {
      const imageResponse = await uploadImage(_file, setProgress);
      console.log("Cloudinary response sent to the backend", imageResponse);

      await API.post(
        "/upload-profile-image",
        {
          cloudinaryResponse: imageResponse,
          userId: userId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      console.error("Error uploading image:", JSON.stringify(error));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.backgroundContainer}>
        <Background />
      </View>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={openImageLibrary}
          style={styles.uploadBtnContainer}
        >
          {profileImage ? (
            <View>
              <Image source={{ uri: profileImage }} style={styles.image} />
            </View>
          ) : (
            <Text style={styles.uploadBtnText}>Change Profile Image</Text>
          )}
        </TouchableOpacity>
        {progress ? <Text>{progress}</Text> : null}

        {profileImage && (
          <TouchableOpacity
            onPress={uploadProfileImage}
            style={[
              styles.uploadBtnText,
              styles.uploadBtn,
              { backgroundColor: "green", borderRadius: 8 },
            ]}
          >
            <Text style={{ color: "white" }}>UPLOAD</Text>
          </TouchableOpacity>
        )}

        {/* Display user data */}
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>
      <View style={styles.menucontainer}>
        <Menu />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f0f0f0",
  },
  innerContainer: {
    top: -100,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtnContainer: {
    height: 135,
    width: 135,
    borderRadius: 125 / 2,
    borderStyle: "dashed",
    borderWidth: 1,
  },
  uploadBtnText: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
    marginTop: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: -10, // Adjust this margin to move the image
    right: 10,
  },
  uploadBtn: {
    marginTop: 20,
    padding: 10,
    fontSize: 16,
    opacity: 0.5,
  },
  menucontainer: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: "#DDDDDD",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5, // Adjust this margin to move the name
  },
  userEmail: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 50, // Adjust this margin to move the email
  },
});

export default MyPage;
