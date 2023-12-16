import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB (in bytes)

const SelectImage = ({ onImagesSelected }) => {
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePick = async (sourceType) => {
    // Close the modal
    setModalVisible(false);

    // Request permissions
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.MEDIA_LIBRARY
    );

    if (status !== "granted") {
      alert(
        "Sorry, we need camera and media library permissions to make this work!"
      );
      return;
    }

    let result;
    if (sourceType === "gallery") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        multiple: true,
      });
    } else if (sourceType === "camera") {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    console.log("Image Picker Result:", result);

    if (!result.cancelled) {
      // Update the images state variable with selected image URIs
      setImages(result.assets.map((asset) => asset.uri));
      // Invoke the callback with selected image URIs
      onImagesSelected(result.assets.map((asset) => asset.uri));
    } else {
      // Handle the case when the user cancels image selection
      console.log("Image selection canceled");
    }

    if (!result.cancelled && result.assets[0].fileSize > MAX_FILE_SIZE) {
      alert("File size is too large. Please select a smaller file.");
      return;
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.imagePreview} />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.imagePickerButton, { backgroundColor: "#DABFBF" }]}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="add-to-photos" size={24} color="white" />
        <Text style={styles.buttonText}>ADD IMAGE</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalButtonC}
            onPress={() => handleImagePick("camera")}
          >
            <Text style={styles.modalButtonText}>Choose From Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButtonC}
            onPress={() => handleImagePick("gallery")}
          >
            <Text style={styles.modalButtonText}>Choose From Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePickerButton: {
    // marginLeft: 5, // Add left margin to create space between icon and text
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DABFBF",
    borderRadius: 5,
    marginBottom: 5,
    paddingVertical: 10, // Adjust vertical padding as needed
    paddingHorizontal: 20, // Adjust horizontal padding as needed
  },
  imagePreview: {
    width: 350,
    height: 150,
  },
  buttonText: {
    marginLeft: 5,
    fontFamily: "appfont",
    fontSize: 18,
    color: "white",
  },
  imageArea: {
    width: 200,
    height: 200,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DABFBF",
    marginVertical: 10,
    height: 50,
    width: 100,
    borderRadius: 5,
  },
  modalButtonC: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row", // Arrange buttons horizontally
    backgroundColor: "#DABFBF",
    marginVertical: 10,
    height: 50,
    width: 200,
    borderRadius: 5,
  },

  modalButtonText: {
    fontFamily: "appfont",
    fontSize: 18,
    color: "white",
  },
});

export default SelectImage;
