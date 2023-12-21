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
} from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const AdsCards = ({ posts, myPostScreen, userId, searchText }) => {
  const navigation = useNavigation();
  const [sortedPosts, setSortedPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  // console.log("AdsCrad", userId);
  const handlePostPress = (post, myPostScreen, userId) => {
    navigation.navigate("PostDetailScreen", { post, myPostScreen, userId });
  };

  const filterAndSortPosts = () => {
    const filteredPosts = posts.filter((post) => {
      const name = post?.name?.toLowerCase() || "";
      const make = post?.make?.toLowerCase() || "";
      const model = post?.model?.toLowerCase() || "";
      const rent = post?.rent?.toLowerCase() || "";

      return (
        name.includes(searchText.toLowerCase()) ||
        make.includes(searchText.toLowerCase()) ||
        model.includes(searchText.toLowerCase()) ||
        rent.includes(searchText.toLowerCase())
      );
    });

    return sortedPosts.length ? sortedPosts : filteredPosts;
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
    }

    setSortedPosts(sortedPosts);
    setModalVisible(false);
  };

  return (
    <View>
      <View style={styles.container}>
        {filterAndSortPosts().map((post, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePostPress(post, myPostScreen, userId)}
          >
            <View style={styles.innerContainer} key={index}>
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
              <View style={styles.innerTextContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleHeading}>{post?.name}</Text>
                  <Text style={styles.titleHeading}>
                    {" "}
                    {post.room
                      ? ` Room: ${post.room}`
                      : ` Model: ${post.model}`}
                  </Text>
                  <Text style={styles.titlerentHeading}>
                    {" "}
                    | Rent: {post?.rent}
                  </Text>
                </View>
                <View style={styles.postDetailsContainer}>
                  <View style={styles.ratingContainer}>
                    {/* Your rating icons or components go here */}
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

      {/* Modal for filter options */}
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
  container: {
    // flex: 1,
  },
  innerContainer: {
    height: 294,
    width: 338,
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
    marginBottom: 5,
    marginTop: 10,
  },
  card: {
    width: 340,
    height: 200,
    resizeMode: "cover",
    overflow: "hidden",
    borderRadius: 25,
    backgroundColor: "#D9D9D9",
  },
  innerTextContainer: {
    height: 70,
    backgroundColor: "white",
    borderRadius: 25,
    bottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  titleHeading: {
    fontSize: 18,
    fontFamily: "appfont",
  },
  titleContainer: {
    flexDirection: "row",
    top: 1,
    fontWeight: "bold",
    left: 20,
  },
  titlerentHeading: {
    fontSize: 15,
    top: 4,
    fontWeight: "bold",
  },
  postDetailsContainer: {
    // flex: 1,
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
    // right: 55,
    left: 20,
    bottom: 10,
  },
});

export default AdsCards;
