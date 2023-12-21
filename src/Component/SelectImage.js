import React from "react";
import { TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB (in bytes)

const SelectImage = ({ onSelectImage }) => {
  const openImageLibrary = async (sourceType) => {
    try {
      let response;

      if (sourceType === "gallery") {
        response = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: false,
        });
      } else if (sourceType === "camera") {
        response = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: false,
        });
      }

      if (!response.cancelled) {
        onSelectImage(response.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image", error);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => openImageLibrary("gallery")}
        style={{
          height: 50,
          width: 173,
          justifyContent: "center",
          alignItems: "center",
          borderStyle: "dashed",
          borderWidth: 1,
          borderRadius: 5,
          marginRight: 5,
        }}
      >
        <Text>Select from Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => openImageLibrary("camera")}
        style={{
          height: 50,
          width: 173,
          justifyContent: "center",
          alignItems: "center",
          borderStyle: "dashed",
          borderWidth: 1,
          borderRadius: 5,
          marginRight: 5,
        }}
      >
        <Text>Take Photo</Text>
      </TouchableOpacity>
    </>
  );
};

// const styles = StyleSheet.create({});

export default SelectImage;
