import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({
  setSearchText,
  imageSource,
  placeholder,
  setSortOption,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = () => {
    setSearchText(searchInput);
    setSearchInput("");
  };

  const handleFilter = () => {
    setModalVisible(true);
  };

  const handleSortOption = (option) => {
    setSortOption(option);

    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.searchContainer}>
        <View style={styles.searchbuttonStyle}>
          <View style={styles.buttonContent}>
            <View style={styles.circle}></View>
            <Image
              source={imageSource}
              style={styles.btnImageStyle}
              resizeMode="contain"
            />
            <TextInput
              style={styles.inputStyle}
              placeholder={placeholder}
              value={searchInput}
              onChangeText={(value) => setSearchInput(value)}
              onSubmitEditing={() => setSearchText()}
              placeholderTextColor="#888"
            />
            <TouchableOpacity onPress={handleSearch}>
              <View style={styles.iconContainer}>
                <FontAwesome5
                  name="search"
                  size={24}
                  color="black"
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFilter}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="filter"
                  size={24}
                  color="black"
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal for filter options */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* <TouchableOpacity onPress={() => handleSortOption("highToLow")}>
                <Text style={styles.sortOption}>High to Low Rent</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleSortOption("lowToHigh")}>
                <Text style={styles.sortOption}>Low to High Rent</Text>
              </TouchableOpacity> */}

              <TouchableOpacity onPress={() => handleSortOption("rating")}>
                <Text style={styles.sortOption}>Low to High Rating</Text>
              </TouchableOpacity>

              <Pressable
                style={styles.closeButton}
                onPress={() => {
                  handleSortOption(null); // Reset sort option when closing modal
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  inputStyle: {
    paddingHorizontal: 25,
    fontSize: 15,
    flex: 1,
  },
  searchbuttonStyle: {
    backgroundColor: "#D8D6F7",
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    borderRadius: 26,
    width: 375,
    height: 81,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    position: "absolute",
    top: -10,
    left: 10,
  },
  btnImageStyle: {
    width: 60,
    height: 50,
    left: 10,
    bottom: 0,
  },
  iconContainer: {
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 10,
    alignItems: "center",
  },
  icon: {
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
  sortOption: {
    fontSize: 18,
    marginVertical: 10,
    color: "black",
  },
});

export default SearchBar;
