import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { API } from "../api/config";
const MyPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    getMediaLibraryPermission();
  }, []);

  const getMediaLibraryPermission = async () => {
    if (Constants.platform.ios || Constants.platform.android) {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access media library denied");
      }
    }
  };

  const handleFileChange = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedFile(result);
      }
    } catch (error) {
      console.error("ImagePicker Error: ", error);
    }
  };

  const handleUpload = async () => {
    try {
      const token = API.defaults.headers.common["Authorization"];
      if (!selectedFile) {
        console.error("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("file", {
        uri: selectedFile.uri,
        type: selectedFile.type,
        name: "profile-image", // You can change this name as needed
      });
      console.log(base64(formData));
      const response = await API.put("/update-image", {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const data = await response.json();

      console.log("Response from server:", data);
    } catch (error) {
      console.error("Error uploading profile picture:", error);

      // Handle error (update UI, show an error message, etc.)
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Button title="Select Image" onPress={handleFileChange} />
      {selectedFile && (
        <Image
          source={{ uri: selectedFile.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Button title="Upload Profile Picture" onPress={handleUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    top: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyPage;
