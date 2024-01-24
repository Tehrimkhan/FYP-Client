import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";
import Background from "../Component/Background";
import * as ImagePicker from "expo-image-picker";
import { API } from "../api/config";
import Menu from "../Component/Menu";
import axios from "axios";
import { useImageUpload } from "../utils/helpers";
import { AuthContext } from "../context/authContext";

const YouPage = () => {
  const [profileImage, setProfileImage] = useState("");
  const [progress, setProgress] = useState(0);
  // const [userIdArray, userImage, userName] = useContext(AuthContext);
  // const userId = userIdArray;
  // console.log("YOUPAGE", userIdArray);
  // console.log("YOUPAGE image", userImage);
  // console.log("YOUPAGE name", userName);
  const [
    userId,
    setUserId,
    userName,
    setUserName,
    userImage,
    setUserImage,
    userEmail,
    setUserEmail,
  ] = useContext(AuthContext);

  console.log("YOUPAGE userId", userId);
  console.log("YOUPAGE userName", userName);
  console.log("YOUPAGE userImage", userImage);
  console.log("YOUPAGE email", userEmail);

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
        console.log(response);
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

    // const filesBhtsari = [_file, _file, _file, _file];

    // const allPromises = filesBhtsari.map((file) => uploadImage(file, setProgress));

    // const [image1, image2] = await Promise.all(allPromises);

    // const [image1, image2] = await Promise.all([uploadImage(_file, setProgress), uploadImage(_file, setProgress), uploadImage(_file, setProgress), uploadImage(_file, setProgress),]);
    const token = API.defaults.headers.common["Authorization"];

    try {
      const imageResponse = await uploadImage(_file, setProgress);
      console.log("Cloudinary response sent to the backend", imageResponse);

      // Update the userImage state in real-time
      setUserImage(imageResponse.url);

      // Send the Cloudinary response and userId to your backend
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
    <View>
      <View style={styles.backgroundcontainer}>
        <Background />
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          onPress={openImageLibrary}
          style={styles.uploadBtnContainer}
        >
          {profileImage ? (
            <View>
              <Image source={{ uri: profileImage }} style={styles.image} />
            </View>
          ) : userImage ? (
            <View>
              <Image source={{ uri: userImage }} style={styles.image} />
            </View>
          ) : (
            <Text style={styles.uploadBtnText}>Change Profile Image</Text>
          )}
        </TouchableOpacity>
        {progress ? <Text>{progress}</Text> : null}

        <Text style={styles.skip}>Skip</Text>
        {profileImage ? (
          <Text
            onPress={uploadProfileImage}
            style={[
              styles.skip,
              { backgroundColor: "green", color: "white", borderRadius: 8 },
            ]}
          >
            UPLOAD
          </Text>
        ) : null}
        {/* Display user data */}
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>
      <View style={styles.menucontainer}>
        <Menu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
  },
  uploadBtnText: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
  },
  image: {
    top: -75,
    right: -75,
    width: 150,
    height: 150,
    borderRadius: 125 / 2,
    position: "absolute",
  },
  skip: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    opacity: 0.5,
  },
  menucontainer: {
    top: 500,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },

  userEmail: {
    fontSize: 16,
    opacity: 0.7,
  },
});

export default YouPage;
