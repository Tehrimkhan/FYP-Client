import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
const { width } = Dimensions.get("window");

const AdsCards = ({ posts, myPostScreen, userId, searchText, sortOption }) => {
  const navigation = useNavigation();
  const [searchPosts, setSearchedPosts] = useState([]);
  console.log("adscard", sortOption);

  const handlePostPress = (post, myPostScreen, userId) => {
    navigation.navigate("PostDetailScreen", { post, myPostScreen, userId });
  };

  const SearchAndSortPosts = () => {
    const SearchedPosts = posts.filter((post) => {
      const name = post?.name?.toLowerCase() || "";
      const make = post?.make?.toLowerCase() || "";
      const model = post?.model?.toLowerCase() || "";
      const rent = post?.rent?.toLowerCase() || "";

      const area = post?.area?.toLowerCase() || "";
      const room = post?.room?.toLowerCase() || "";

      return (
        name.includes(searchText.toLowerCase()) ||
        make.includes(searchText.toLowerCase()) ||
        model.includes(searchText.toLowerCase()) ||
        area.includes(searchText.toLowerCase()) ||
        room.includes(searchText.toLowerCase()) ||
        rent.includes(searchText.toLowerCase())
      );
    });

    return searchPosts.length ? searchPosts : SearchedPosts;
  };

  const searchedAndSortedPosts = SearchAndSortPosts();

  const filteredPosts = () => {
    if (sortOption === "highToLow") {
      return searchedAndSortedPosts.sort((a, b) => b.rent - a.rent);
    }
    if (sortOption === "lowToHigh") {
      return searchedAndSortedPosts.sort((a, b) => a.rent - b.rent);
    }
    if (sortOption === "rating") {
      return searchedAndSortedPosts.sort((a, b) => a.rating - b.rating);
    }
  };

  const sortedPosts = filteredPosts();

  return (
    <View style={styles.container}>
      {searchedAndSortedPosts.length > 0 || sortedPosts.length > 0 ? (
        (sortOption === "highToLow" ? sortedPosts : searchedAndSortedPosts).map(
          (post, index) => (
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
                      {post.room
                        ? ` Room: ${post.room}`
                        : ` Model: ${post.model}`}
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
                    <View>
                      <Text style={styles.postDetailsText}>
                        {moment(post?.createdAt).format("DD:MM:YYYY")}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        )
      ) : (
        <Text style={styles.nothingFoundText}>Nothing found</Text>
      )}
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
    // right: 55,
    left: 20,
    bottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  nothingFoundText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AdsCards;
