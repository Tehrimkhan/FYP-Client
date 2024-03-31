import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import Background from "../Background";
import Menu from "../Menu";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  EvilIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { API } from "../../api/config";
import Rating from "../Rating";
import { FontAwesome } from "@expo/vector-icons";

const PostDetailScreen = ({ route }) => {
  const { post, myPostScreen, userId } = route.params;
  const token = API.defaults.headers.common["Authorization"];
  const [rating, setRating] = useState(0);
  const [loadingComments, setLoadingComments] = useState(true); // Add loading state for comments
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const navigation = useNavigation();

  const profileImage = post?.postedBy?.profileImage?.[0]?.secure_url;
  console.log("Profile Image:", profileImage);

  const handleBackButton = () => {
    navigation.navigate("Dashboard");
  };
  const handleSubmit = () => {
    if (post?.postedBy?._id && post?.postedBy?.name) {
      navigation.navigate("ChatMessagePage", {
        recieverName: post.postedBy.name,
        profileImage: post.postedBy.profileImage[0].secure_url,
        receiverId: post.postedBy._id,
      });
    } else {
      console.error("Error: Insufficient postedBy information.");
    }
  };
  useEffect(() => {
    if (post?.status === "rejected") {
      const deleteAlert = setTimeout(() => {
        alert("This post will be deleted in one day.");
      }, 24 * 60 * 60 * 1000);

      return () => clearTimeout(deleteAlert);
    }
  }, [post?.status]);

  const handleDeletePost = async (id) => {
    try {
      if (!token || token.trim() === "") {
        alert("Authorization token missing. Please log in.");
        return;
      }
      const response = await API.delete(`/post/delete-post/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.success) {
        alert(response.data.message);
        navigation.navigate("Dashboard", { userId: userId });
      } else {
        console.error(response.data.message);
        alert("Error deleting post");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting post");
    }
  };

  useEffect(() => {
    if (post?.reviews && post.reviews.length > 0) {
      const extractedComments = post.reviews.map((review) => review.comment);
      setComments(extractedComments);
      setLoadingComments(false); // Set loading to false once comments are loaded
    }
  }, [post]);

  const handleAddComment = async () => {
    try {
      if (!comment || comment.trim() === "") {
        alert("Comment cannot be empty");
        return;
      }

      const response = await API.put(
        `/post/comments/${post?._id}`,
        {
          comment: comment,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.success) {
        setComments((prevComments) => [...prevComments, comment]);
        setComment("");
        alert("Comment added successfully!");
      } else {
        console.error(response.data.message);
        alert("Error adding comment");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding comment");
    }
  };
  const handleRatingChange = async (value) => {
    try {
      setRating(value);

      await submitRating(post?._id, value);
    } catch (error) {
      console.error(error);
      alert("Error submitting rating");
    }
  };

  const submitRating = async (postId, ratingValue) => {
    try {
      const response = await API.put(
        `/post/ratings/${postId}`,
        {
          rating: ratingValue,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.success) {
        alert("Rating submitted successfully!");
      } else {
        alert("You've already rated this post!");
      }
    } catch (error) {
      alert("You've already rated this post!");
    }
  };

  return (
    <View>
      <Ionicons
        name="arrow-back-sharp"
        size={30}
        color="white"
        style={{ top: -200, left: 12 }}
        onPress={() => handleBackButton()}
      />
      <View style={styles.superContainer}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerText}>SUBSCRIBE YOUR CAR</Text>
        </View>
        <View style={styles.overallContainer}>
          <View style={styles.outerContainer}>
            <View style={styles.outerImageContainer}>
              {post?.postImages && post.postImages.length > 0 ? (
                <ScrollView horizontal>
                  {post.postImages.map((image, index) => (
                    <Image
                      key={index}
                      source={{ uri: image.url }}
                      resizeMode="cover"
                      style={styles.imageContainer}
                    />
                  ))}
                </ScrollView>
              ) : (
                <View style={styles.imageContainer} />
              )}
            </View>

            <View style={styles.innerMainContainer}>
              <View style={styles.upperheaderContainer}>
                <Text style={styles.upperTextContainer}>{post.name}</Text>
                <Text style={styles.upperTextContainer}>
                  {post.room ? ` Room: ${post.room}` : ` Model: ${post.model}`}
                </Text>
                <Text style={styles.titlerentHeading}>
                  {" "}
                  | Rent: {post?.rent}
                </Text>
              </View>
              <View style={styles.lowerHeaderContainer}>
                <Text style={styles.lowertitleHeading}>
                  {post.room ? `Area: ${post.area}` : `Make: ${post.make}`}
                </Text>
                <Text style={[styles.lowertitleHeading, { marginLeft: 25 }]}>
                  {post.room
                    ? `Floor: ${post.floor} th`
                    : `Variant: ${post.variant}`}
                </Text>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.discTextContainer}>Description:</Text>
                <Text>{post?.description}</Text>
              </View>
              {myPostScreen && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    top: 40,
                    gap: 150,
                  }}
                >
                  {/* <MaterialCommunityIcons
                    name="pencil-plus"
                    size={24}
                    color="black"
                  /> */}
                  <TouchableOpacity onPress={() => handleDeletePost(post?._id)}>
                    <MaterialIcons name="delete" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              )}
              {post?.postedBy?.name && (
                <Text
                  style={[
                    styles.upperTextContainer,
                    { marginLeft: 10, top: 30 },
                  ]}
                >
                  Seller Name: {post?.postedBy?.name}
                </Text>
              )}
              <View style={styles.ratingContainer}>
                <Rating rating={rating} onRatingChange={handleRatingChange} />
                <Text style={styles.ratingText}>
                  {post.rating}
                  <FontAwesome name="star" size={23} color="#FFD700" />
                </Text>
              </View>
              <View style={styles.commentContainer}>
                <View style={styles.commentInputContainer}>
                  <TextInput
                    multiline
                    placeholder="Add a comment..."
                    style={styles.commentInput}
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                  />
                  <EvilIcons
                    name="arrow-right"
                    size={25}
                    color="black"
                    style={styles.arrowIcon}
                    onPress={handleAddComment}
                  />
                </View>
              </View>
              <View style={styles.scrollviewContainer}>
                {loadingComments ? (
                  <View style={styles.loadingContainer}>
                    <Text>Loading comments...</Text>
                  </View>
                ) : (
                  <ScrollView>
                    {comments.map((item, index) => (
                      <View key={index} style={styles.comment}>
                        <Text>{item}</Text>
                      </View>
                    ))}
                  </ScrollView>
                )}
              </View>
              {!myPostScreen && userId !== post?.postedBy?._id && (
                <TouchableOpacity
                  style={styles.subscribeButton}
                  onPress={() => handleSubmit()}
                >
                  <MaterialIcons
                    name="add-circle-outline"
                    size={24}
                    color="white"
                  />
                  <Text style={styles.subscribeButtonText}>SUBSCRIBE</Text>
                </TouchableOpacity>
              )}
              {userId === post?.postedBy?._id && (
                <View style={styles.ownPostContainer}>
                  <Text style={styles.ownPostText}>THIS IS YOUR OWN POST</Text>
                  <View
                    style={[
                      styles.statusStyle,
                      post?.status === "pending"
                        ? styles.pending
                        : post?.status === "approved"
                        ? styles.approved
                        : post?.status === "rejected"
                        ? styles.rejected
                        : {},
                    ]}
                  >
                    {post?.status === "rejected" ? (
                      <Text>
                        Post rejected by Admin, will be deleted in 1 day!
                      </Text>
                    ) : (
                      <Text>Post Status: {post?.status}</Text>
                    )}
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomMenu}>
        <Menu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  superContainer: {
    justifyContent: "center",
    alignItems: "center",
    top: 40,
  },
  overallContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  outerContainer: {
    top: 30,
    height: 540,
    //height: 580,
    width: 380,
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
    marginBottom: 60,
  },
  innerMainContainer: {
    top: -40,
    width: 360,
    height: 325,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    left: 10,
  },
  imageContainer: {
    backgroundColor: "#D9D9D9",
    width: 380,
    height: 200,
    borderRadius: 25,
  },
  outerImageContainer: {
    bottom: 50,
  },
  headerStyle: {
    backgroundColor: "#D8D6F7",
    borderRadius: 26,
    width: 375,
    height: 81,
    top: -30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "appfont",
    fontSize: 20,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },

  // innerContainer: {
  //   height: 87,
  //   width: 360,
  //   backgroundColor: "#FFFFFF",
  //   borderRadius: 25,
  // },
  upperheaderContainer: {
    top: 10,
    flexDirection: "row",
    textAlign: "left", // Align text to the left
    marginLeft: 10, // Add a left margin for consistent gap
  },
  lowerHeaderContainer: {
    top: 10,
    flexDirection: "row",
    textAlign: "left", // Align text to the left
    marginLeft: 10, // Add a left margin for consistent gap
  },
  descriptionContainer: {
    top: 20,
    width: 345,
    textAlign: "left", // Align text to the left
    marginLeft: 10, // Add a left margin for consistent gap
  },
  titlerentHeading: {
    fontSize: 15,
    top: 4,
    fontWeight: "bold",
  },
  lowertitleHeading: {
    fontSize: 15,
    top: 4,
    fontWeight: "bold",
  },
  upperTextContainer: {
    fontSize: 18,
    fontFamily: "appfont",
  },
  discTextContainer: {
    fontSize: 18,
    fontFamily: "appfont",
  },

  // sellerContainer: {
  //   top: 20,
  //   width: 360,
  //   height: 35,
  //   backgroundColor: "#FFFFFF",
  //   borderRadius: 25,
  // },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    top: 10,
    left: 5,
  },
  ratingText: {
    top: 10,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 100,
  },
  commentContainer: {
    top: 10,
    width: 340,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#DDDDDD",
    left: 10,
  },
  comment: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  commentInput: {
    flex: 1,
    height: "100%", // Match the height of the container
  },
  scrollviewContainer: {
    top: 10,
    height: 100,
    width: 340,
    left: 10,
  },
  arrowIcon: {
    marginLeft: 10, // Adjust the spacing between input and arrow as needed
  },
  subscribeButton: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center", // Center the content horizontally
    top: 20,
    width: 360,
    height: 35,
    backgroundColor: "#F41111",
    borderRadius: 25,
  },
  subscribeButtonText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontFamily: "appfont",
  },
  bottomMenu: {
    position: "absolute",
    bottom: -52,
    // bottom: 160,
    //phone
    //bottom: -70,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: "#DDDDDD",
  },
  ownPostText: {
    fontSize: 15,
    color: "red",
    fontFamily: "appfont",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 1,
  },
  ownPostContainer: {
    top: 5,
  },
  statusStyle: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 15,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  pending: {
    backgroundColor: "rgba(0, 0, 255, 0.3)",
  },
  approved: {
    backgroundColor: "rgba(0, 255, 0, 0.3)",
  },
  rejected: {
    backgroundColor: "rgba(255, 0, 0, 0.3)",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostDetailScreen;
