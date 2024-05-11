import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const AdsCards = ({ posts, myPostScreen, userId, searchText, isMyAdsPage }) => {
  const navigation = useNavigation();
  const [sortedPosts, setSortedPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [showRangeFilter, setShowRangeFilter] = useState(false);

  const handlePostPress = (post, myPostScreen, userId) => {
    navigation.navigate("PostDetailScreen", { post, myPostScreen, userId });
  };

  const filterAndSortPosts = () => {
    let filteredPosts = [...posts];

    if (showRangeFilter) {
      filteredPosts = filteredPosts.filter((post) => {
        const postRent = parseInt(post?.rent);
        const fromRent = parseInt(fromPrice);
        const toRent = parseInt(toPrice);

        if (!isNaN(fromRent) && !isNaN(toRent)) {
          return postRent >= fromRent && postRent <= toRent;
        } else if (!isNaN(fromRent)) {
          return postRent >= fromRent;
        } else if (!isNaN(toRent)) {
          return postRent <= toRent;
        }
        return true;
      });
    }

    const finalFilteredPosts = filteredPosts.filter((post) => {
      const name = post?.name?.toLowerCase() || "";
      const make = post?.make?.toLowerCase() || "";
      const model = post?.model?.toLowerCase() || "";
      const rent = post?.rent?.toLowerCase() || "";

      const area = post?.area?.toLowerCase() || "";
      const room = post?.room?.toLowerCase() || "";

      const color = post?.color?.toLowerCase() || "";
      const fabric = post?.fabric?.toLowerCase() || "";
      const size = post?.size?.toLowerCase() || "";
      const gender = post?.gender?.toLowerCase() || "";

      const material = post?.material?.toLowerCase() || "";
      const style = post?.style?.toLowerCase() || "";

      return (
        (name.includes(searchText.toLowerCase()) ||
          make.includes(searchText.toLowerCase()) ||
          model.includes(searchText.toLowerCase()) ||
          area.includes(searchText.toLowerCase()) ||
          room.includes(searchText.toLowerCase()) ||
          color.includes(searchText.toLowerCase()) ||
          fabric.includes(searchText.toLowerCase()) ||
          size.includes(searchText.toLowerCase()) ||
          gender.includes(searchText.toLowerCase()) ||
          material.includes(searchText.toLowerCase()) ||
          style.includes(searchText.toLowerCase()) ||
          rent.includes(searchText.toLowerCase())) &&
        (post.rating || post.rating === 0) &&
        post.rating >= minRating
      );
    });

    return sortedPosts.length ? sortedPosts : finalFilteredPosts;
  };

  const handleSortOption = (option) => {
    let sortedPosts = [...filterAndSortPosts()];

    if (option === "lowToHigh") {
      sortedPosts = sortedPosts.sort(
        (a, b) => parseInt(a.rent) - parseInt(b.rent)
      );
    } else if (option === "highToLow") {
      sortedPosts = sortedPosts.sort(
        (a, b) => parseInt(b.rent) - parseInt(a.rent)
      );
    } else if (option === "alphabeticalOrder") {
      sortedPosts = sortedPosts.sort((a, b) => a.name?.localeCompare(b.name));
    } else if (option === "showApartments") {
      sortedPosts = sortedPosts.filter(
        (post) => post.title.toLowerCase() === "apartment"
      );
    } else if (option === "showApparels") {
      sortedPosts = sortedPosts.filter(
        (post) => post.title.toLowerCase() === "apparel"
      );
    } else if (option === "showFurnitures") {
      sortedPosts = sortedPosts.filter(
        (post) => post.title.toLowerCase() === "furniture"
      );
    } else if (option === "showCars") {
      sortedPosts = sortedPosts.filter(
        (post) => post.title.toLowerCase() === "car"
      );
    }

    setSortedPosts(sortedPosts);
    setModalVisible(false);
  };
  const toggleRangeFilter = () => {
    if (showRangeFilter) {
      setFromPrice("");
      setToPrice("");
      setShowRangeFilter(false);
      setSortedPosts([]);
    } else {
      setShowRangeFilter(true);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={toggleRangeFilter}
          style={{
            top: 5,
            left: 300,
            bottom: 10,
          }}
        >
          <FontAwesome
            name={showRangeFilter ? "chevron-up" : "chevron-down"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        {/* Range filter */}
        {showRangeFilter && (
          <View style={styles.filterContainer}>
            <View style={styles.rangeFilterContainer}>
              <TextInput
                style={[styles.inputStyle, { marginRight: 10 }]}
                placeholder="From"
                keyboardType="numeric"
                value={fromPrice}
                onChangeText={(value) => setFromPrice(value)}
                placeholderTextColor="#fff"
              />
              <TextInput
                style={styles.inputStyle}
                placeholder="To"
                keyboardType="numeric"
                value={toPrice}
                onChangeText={(value) => setToPrice(value)}
                placeholderTextColor="#fff"
              />
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                position: "absolute",
                right: 15,
                top: 10,
              }}
            >
              <FontAwesome name="sliders" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        {/* Render posts */}
        {filterAndSortPosts().map((post, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePostPress(post, myPostScreen, userId)}
          >
            <View style={styles.innerContainer} key={index}>
              {/* Post images */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
              >
                {post?.postImages.map((image, imageIndex) => (
                  <Image
                    key={imageIndex}
                    source={{ uri: image.url }}
                    style={styles.card}
                    resizeMode="cover"
                    onError={(e) =>
                      console.log("Error loading image:", e.nativeEvent.error)
                    }
                  />
                ))}
              </ScrollView>

              {/* Post details */}
              <View style={styles.innerTextContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleHeading}>{post?.name}</Text>
                  <Text style={styles.titleHeading}>
                    {post.room
                      ? ` Room: ${post.room}`
                      : post.model
                      ? ` Model: ${post.model}`
                      : ` Color: ${post.color}`}
                  </Text>
                  <Text style={styles.titlerentHeading}>
                    | Rent: {post?.rent}
                  </Text>
                </View>
                <View style={styles.postDetailsContainer}>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>
                      Rating: {post?.rating}
                    </Text>
                    <FontAwesome
                      name="star"
                      size={20}
                      left={5}
                      color="#FFD700"
                    />
                  </View>
                  <Text style={styles.postDetailsText}>
                    {moment(post?.createdAt).format("DD:MM:YYYY")}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal for sort options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => handleSortOption("highToLow")}>
              <Text style={styles.sortOption}>High to Low Rent</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSortOption("lowToHigh")}>
              <Text style={styles.sortOption}>Low to High Rent</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSortOption("alphabeticalOrder")}
            >
              <Text style={styles.sortOption}>Alphabetical Order</Text>
            </TouchableOpacity>
            {/* Conditionally render the additional option */}
            {isMyAdsPage && (
              <View>
                <TouchableOpacity
                  onPress={() => handleSortOption("showApartments")}
                >
                  <Text style={styles.sortOption}>Show Apartments</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSortOption("showApparels")}
                >
                  <Text style={styles.sortOption}>Show Apparels</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSortOption("showFurnitures")}
                >
                  <Text style={styles.sortOption}>Show Furnitures</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleSortOption("showCars")}>
                  <Text style={styles.sortOption}>Show Cars</Text>
                </TouchableOpacity>
              </View>
            )}

            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  innerContainer: {
    height: 290,
    width: 338,
    backgroundColor: "#563978",
    borderRadius: 25,
    marginBottom: 20,
    marginTop: 10,
  },
  card: {
    width: 340,
    height: 200,
    resizeMode: "cover",
    overflow: "hidden",
    borderRadius: 15,
    backgroundColor: "#342d4e",
  },
  innerTextContainer: {
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 15,
    bottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  titleHeading: {
    marginTop: 10,
    fontSize: 15,
    fontFamily: "appfont",
  },
  titleContainer: {
    flexDirection: "row",
    top: 1,
    fontWeight: "bold",
    left: 20,
  },
  titlerentHeading: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  postDetailsContainer: {
    top: 15,
    flexDirection: "row",
  },
  postDetailsText: {
    textAlign: "right",
    left: 130,
    bottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    left: 20,
    bottom: 10,
  },
  rangeFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 5,
  },
  inputStyle: {
    width: 100,
    height: 30,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    color: "#fff",
  },
  applyButtonContainer: {
    marginLeft: 10,
  },
  applyButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: 5,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sortOption: {
    fontSize: 18,
    marginVertical: 10,
    color: "black",
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
  ratingText: {
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default AdsCards;
