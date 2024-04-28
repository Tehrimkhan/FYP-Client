import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import Background from "../Component/Background";
import * as ImagePicker from "expo-image-picker";
import { API } from "../api/config";
import Menu from "../Component/Menu";
import { useImageUpload } from "../utils/helpers";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { AuthContext } from "../context/authContext";

const MyPage = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userIdArray, setUserIdArray] = useContext(AuthContext);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const userId = userIdArray?.data?.user?._id;
  const token = API.defaults.headers.common["Authorization"];

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
        setProfileImage(response.assets[0].uri);
        setShowUploadButton(true);
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

  const handleEditProfile = async () => {
    try {
      if (!token || token.trim() === "") {
        alert("Authorization token missing. Please log in.");
        return;
      }

      const response = await API.put(
        "/profile-update",
        {
          name: newName,
          email: newEmail,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.success) {
        setNewName(newName);
        setNewEmail(newEmail);
        setProfileModalVisible(false);
        alert("User Profile Updated!");
      } else {
        alert("Could not Update Information!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (!oldPassword || !newPassword) {
        alert("Please provide old and new passwords!");
        return;
      }
      if (!token || token.trim() === "") {
        alert("Authorization token missing. Please log in.");
        return;
      }
      const response = await API.put(
        "/update-password",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.success) {
        setPasswordModalVisible(false);
        alert("Password Updated Successfully!");
      } else {
        alert("Could not Update Password!");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handleLogout = () => {
    navigation.navigate("MainPage");
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

        {showUploadButton && (
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

        <View style={styles.userDataContainer}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => setProfileModalVisible(true)}>
              <FontAwesome name="edit" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.updPassButton}
          onPress={() => setPasswordModalVisible(true)}
        >
          <MaterialIcons
            name="update"
            size={24}
            color="#fff"
            style={styles.updatePassIcon}
          />
          <Text style={styles.updatePassButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for editing profile */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={profileModalVisible}
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="New Name"
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              style={styles.input}
              placeholder="New Email"
              value={newEmail}
              onChangeText={setNewEmail}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleEditProfile}
            >
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setProfileModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for updating password */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={passwordModalVisible}
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Old Password"
              secureTextEntry={true}
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry={true}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleUpdatePassword}
            >
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setPasswordModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome5
          name="power-off"
          size={22}
          color="#fff"
          style={styles.logoutIcon}
        />
        <Text style={styles.logoutButtonText}>LOGOUT</Text>
      </TouchableOpacity>

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
    marginTop: 30,
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
    marginTop: -10,
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
    bottom: 20,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: "#DDDDDD",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#fff",
  },
  userEmail: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 10,
    color: "#fff",
  },
  userDataContainer: {
    backgroundColor: "#342d4e",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    position: "relative",
    width: 370,
    height: 80,
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    width: "100%",
    backgroundColor: "#9c80e7",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#9c80e7",
    paddingVertical: 10,
    paddingHorizontal: 20, // Adjust the padding as needed
    borderRadius: 25,
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  logoutIcon: {
    marginRight: 10,
  },
  updPassButton: {
    flexDirection: "row",
    backgroundColor: "#9c80e7",
    paddingVertical: 10,
    paddingHorizontal: 90, // Adjust the padding as needed
    borderRadius: 25,
    marginTop: 20,
  },
  updatePassButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  updatePassIcon: {
    marginRight: 10,
  },
});

export default MyPage;
