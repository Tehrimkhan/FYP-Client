import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import SearchBar from "../Component/Home/SearchBar";
import carlogo from "../../assets/carlogo.png";
import Menu from "../Component/Menu";
import AdsCards from "../Component/Banner/AdsCards";
import { AuthContext } from "../context/authContext";
import Background from "../Component/Background";

const CarPage = ({ route }) => {
  const { carPosts } = route.params;
  const [userIdArray] = useContext(AuthContext);
  const userId = userIdArray?.data?.user?._id;
  // const [
  //   userId,
  //   // setUserId,
  //   // userName,
  //   // setUserName,
  //   // userImage,
  //   // setUserImage,
  //   // userEmail,
  //   // setUserEmail,
  // ] = useContext(AuthContext);
  // console.log("CarPage ID", userId);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarPosts = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    fetchCarPosts();
  }, [searchText]);

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.searchContainer}>
        <SearchBar
          setSearchText={(value) => setSearchText(value)}
          imageSource={carlogo}
          placeholder="SEARCH YOUR CAR"
        />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.lengthText}>Total Posts: {carPosts?.length}</Text>
        </View>

        <View style={styles.scrollContainer}>
          {isLoading ? (
            <Image
              source={require("../../assets/Spinner-1s-200px.gif")}
              style={{ width: 50, height: 50 }}
            />
          ) : (
            <ScrollView>
              <AdsCards
                posts={carPosts}
                userId={userId}
                searchText={searchText}
              />
            </ScrollView>
          )}
        </View>
      </View>
      <View style={styles.bottomMenu}>
        <Menu />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    top: 115,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  innerContainer: {
    // top: -15,
  },
  textContainer: {
    top: -35,
  },
  scrollContainer: {
    height: 480,
    marginTop: 10,
    bottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  lengthText: {
    left: 15,
  },
  bottomMenu: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: "#DDDDDD",
  },
});

export default CarPage;
