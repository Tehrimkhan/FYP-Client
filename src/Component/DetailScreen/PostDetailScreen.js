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
  Switch,
  Modal,
  Button,
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
  const [active, setActive] = useState(post.active);
  const [modalVisible, setModalVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [dob, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const postName = post.name;

  const navigation = useNavigation();

  const profileImage = post?.postedBy?.profileImage?.[0]?.secure_url;
  //console.log("Profile Image:", profileImage);

  const handleBackButton = () => {
    navigation.navigate("Dashboard");
  };
  const handleSubmitModal = async () => {
    if (!fullName || !dob || !address || !phoneNumber || !email) {
      alert("Please fill in all fields");
      return;
    } else {
      try {
        const token = API.defaults.headers.common["Authorization"];

        if (!token || token.trim() === "") {
          alert("Authorization token missing. Please log in.");
          return;
        }
        const data = await API.post(
          "/renter/register-renter",
          {
            postName,
            fullName,
            dob,
            address,
            phoneNumber,
            email,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (data && data.data) {
          alert("Registered Successfully!");

          setFullName("");
          setDOB("");
          setAddress("");
          setPhoneNumber("");
          setEmail("");
          setModalVisible(false);
          setStatusModalVisible(false);
        } else {
          alert("Data is Undefined!");
        }
      } catch (error) {
        console.error(error);
        alert("Error registering renter");
      }
    }
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

  const handleStatusChange = async () => {
    try {
      const response = await API.put(
        `/post/status/${post._id}`,
        {
          active: !active,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.success) {
        setActive(!active);
        if (active) {
          setStatusModalVisible(true);
        } else {
          alert(`Post ${active ? "deactivated" : "activated"} successfully`);
        }
      } else {
        console.error(response.data.message);
        alert("Error changing post status");
      }
    } catch (error) {
      console.error(error);
      alert("Error changing post status");
    }
  };

  return (
    <View style={styles.superContainer}>
      {/* <Ionicons
        name="arrow-back-sharp"
        size={30}
        color="white"
        style={{ top: -200, left: 12 }}
        onPress={() => handleBackButton()}
      /> */}
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.headerText}>SUBSCRIBE</Text>
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
              <ScrollView>
                <View style={styles.upperheaderContainer}>
                  <Text style={styles.upperTextContainer}>{post.name}</Text>
                  <Text style={styles.upperTextContainer}>
                    {post.room
                      ? ` Room: ${post.room}`
                      : post.model
                      ? ` Model: ${post.model}`
                      : ` Color: ${post.color}`}
                  </Text>
                  <Text style={styles.titlerentHeading}>
                    {" "}
                    | Rent: {post?.rent}
                  </Text>
                </View>
                {myPostScreen && (
                  <View style={styles.statusButtonContainer}>
                    {/* <Text style={styles.statusText}>
                      {active ? "Active" : "Inactive"}
                    </Text> */}
                    <Switch
                      value={active}
                      onValueChange={handleStatusChange}
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={active ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                    />
                  </View>
                )}
                <View style={styles.lowerHeaderContainer}>
                  <Text style={styles.lowertitleHeading}>
                    {post.room
                      ? `Area: ${post.area}`
                      : post.make
                      ? `Make: ${post.make}`
                      : post.material
                      ? `Material: ${post.material}`
                      : `Fabric: ${post.fabric}`}
                  </Text>
                  <Text style={[styles.lowertitleHeading, { marginLeft: 15 }]}>
                    {post.room
                      ? ` Floor: ${post.floor} th`
                      : post.variant
                      ? ` Variant: ${post.variant}`
                      : post.style
                      ? ` Style: ${post.style}`
                      : ` Size: ${post.size}`}
                    {post.gender ? `  Category: ${post.gender}'s` : ""}
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
                      top: 30,
                      left: 130,
                    }}
                  >
                    {/* <MaterialCommunityIcons
                    name="pencil-plus"
                    size={24}
                    color="black"
                  /> */}
                    <TouchableOpacity
                      onPress={() => handleDeletePost(post?._id)}
                    >
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
                    Seller: {post?.postedBy?.name}
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
                      <Text>No Comments</Text>
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
              </ScrollView>
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
              <Modal
                animationType="slide"
                transparent={true}
                visible={statusModalVisible}
                onRequestClose={() => {
                  setStatusModalVisible(false);
                }}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Post Deactivated</Text>
                    <Text style={styles.modalTitle}>Enter Renter Details</Text>
                    <TextInput
                      style={styles.input}
                      placeholder={postName}
                      editable={false}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Full Name"
                      value={fullName}
                      onChangeText={(text) => setFullName(text)}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Date of Birth"
                      value={dob}
                      onChangeText={(text) => setDOB(text)}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Home Address"
                      value={address}
                      onChangeText={(text) => setAddress(text)}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChangeText={(text) => setPhoneNumber(text)}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Email Address"
                      value={email}
                      onChangeText={(text) => setEmail(text)}
                    />
                    <Button title="Submit" onPress={handleSubmitModal} />
                  </View>
                </View>
              </Modal>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#17171f",

    bottom: 10,
  },
  overallContainer: {
    justifyContent: "center",
    alignItems: "center",
    top: 40,
  },
  outerContainer: {
    top: 30,
    height: 540,
    //height: 580,
    width: 380,
    backgroundColor: "#563978",
    borderRadius: 10,
    marginBottom: 80,
  },
  innerMainContainer: {
    top: -40,
    width: 360,
    height: 325,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
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
    backgroundColor: "#563978",
    borderRadius: 26,
    width: 375,
    height: 60,
    top: 10,
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
  statusButtonContainer: {
    justifyContent: "flex-end", // Changed to flex-end
    paddingHorizontal: 20,
    marginTop: -20,
    left: "80%",
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
    marginLeft: 80,
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
    height: "100%",
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
    top: 45,
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
    bottom: 10,
    left: 0,
    right: 0,
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
    top: 62,
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
    justifyContent: "center",
    alignItems: "center",
    top: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "70%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default PostDetailScreen;
