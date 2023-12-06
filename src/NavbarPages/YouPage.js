import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Background from "../Component/Background";
import * as ImagePicker from "expo-image-picker";
import { API } from "../api/config";

const YouPage = () => {
  const [profileImage, setProfileImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

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
    try {
      const token = API.defaults.headers.common["Authorization"];

      if (!token || token.trim() === "") {
        alert("Authorization token missing. Please log in.");
        return;
      }

      if (!profileImage) {
        console.log("No image selected");
        return;
      }

      setUploading(true);

      const formData = new FormData();
      formData.append("file", {
        name: new Date(),
        uri: profileImage,
        type: "image/jpg",
      });

      const response = await API.put("/update-image", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
        onUploadProgress: (progressEvent) => {
          const progressPercentage = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setProgress(progressPercentage);
        },
      });

      if (response.data.success) {
        console.log(response.data.message);
      } else {
        console.log("Error updating profile picture:", response.data.message);
      }
    } catch (error) {
      console.log("Error uploading profile image:", error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View>
      <Background />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default YouPage;
