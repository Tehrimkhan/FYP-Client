import React from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const AdsCards = ({ posts, myPostScreen, userId }) => {
  const navigation = useNavigation();
  // console.log("USER ID FROM ADS", userId);
  const handlePostPress = (post, myPostScreen, userId) => {
    navigation.navigate("PostDetailScreen", { post, myPostScreen, userId });
  };
  return (
    <View>
      <View style={styles.container}>
        {posts?.map((post, index) => (
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
                {/* <Text>Make: {post?.make}</Text> */}
                {/* <Text>Variant: {post?.variant}</Text>
                <Text>Description: {post?.description}</Text> */}
                <View style={styles.postDetailsContainer}>
                  {/* <Text>PostedBy: {post?.postedBy?.name}</Text> */}
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={24} color="black" />
                    <Ionicons name="star" size={24} color="black" />
                    <Ionicons name="star" size={24} color="black" />
                    <Ionicons name="star" size={24} color="black" />
                    <Ionicons name="star-outline" size={24} color="black" />
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
    marginBottom: 20,
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
