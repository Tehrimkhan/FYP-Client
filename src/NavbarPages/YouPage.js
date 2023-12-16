import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Background from "../Component/Background";
import * as ImagePicker from "expo-image-picker";
import { API } from "../api/config";
import Menu from "../Component/Menu";
import axios from "axios";

const YouPage = () => {
  const [profileImage, setProfileImage] = useState("");
  const [progress, setProgress] = useState(0); // Fix: Initialize progress state with setProgress function
  const openImageLibrary = async () => {
    try {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!response.cancelled) {
        setProfileImage(response.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image", error);
    }
  };

  const uploadProfileImage = async () => {
    if (!profileImage) {
      console.log("No image selected");
      return;
    }

    const uploadUrl = "https://api.cloudinary.com/v1_1/dihvjdw0r/auto/upload/";

    let _file = {
      uri: profileImage,
      name: "IMG_" + Math.random(4000) + ".jpg",
      type: "image/jpeg",
    };

    const data = new FormData();
    data.append("file", _file);
    data.append("upload_preset", "m5adwqsh");
    data.append("cloud_name", "dihvjdw0r");

    const config = {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      onUploadProgress: (progressEvent) => {
        let progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log("UPLOAD IS " + progress + "% DONE!");
        setProgress(progress);
      },
    };

    console.log("Imageeee", data);
    try {
      const response = await API.post(uploadUrl, data, config);
      console.log("Image upload response:", response.data);

      // sending response to backend
      // await API.post("storeCloudinaryResponse", {
      //   cloudinaryResponse: response.data,
      // });

      console.log("Cloudinary response sent to the backend");
    } catch (error) {
      console.error("Error uploading image:", error);
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
    top: 595,
  },
});

export default YouPage;
