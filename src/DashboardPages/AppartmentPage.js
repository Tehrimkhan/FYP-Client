import React, { useContext, useState, useEffect } from "react";
import SearchBar from "../Component/Home/SearchBar";
import applogo from "../../assets/apartlogo.png";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import Menu from "../Component/Menu";
import Background from "../Component/Background";
import AdsCards from "../Component/Banner/AdsCards";
import { AuthContext } from "../context/authContext";

// Your AppartmentPage component
const AppartmentPage = ({ route }) => {
  const { apartmentPosts } = route.params;
  // const [userIdArray] = useContext(AuthContext);
  // const userId = userIdArray?.data?.user?._id;
  const [userIdArray] = useContext(AuthContext);
  const userId = userIdArray?.data?.user?._id;
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState(null);
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
      <View style={styles.bgcontainer}>
        <Background />
      </View>
      <KeyboardAvoidingView>
        <View style={styles.innerContainer}>
          {/* <View style={styles.textContainer}>
          <Text style={styles.lengthText}>Total Posts: {carPosts?.length}</Text>
        </View> */}

          <View style={styles.scrollContainer}>
            {isLoading ? (
              <Image
                source={require("../../assets/Spinner-1s-200px.gif")}
                style={{ width: 50, height: 50 }}
              />
            ) : (
              <ScrollView>
                <AdsCards
                  posts={apartmentPosts}
                  userId={userId}
                  searchText={searchText}
                  sortOption={sortOption} // Pass sortOption as a prop
                />
              </ScrollView>
            )}
          </View>
        </View>
        <View style={styles.bottomMenu}>
          <Menu />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.searchContainer}>
        <SearchBar
          setSearchText={(value) => setSearchText(value)}
          imageSource={applogo}
          placeholder="SEARCH YOUR APARTMENT"
          setSortOption={setSortOption}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgcontainer: { position: "absolute" },
  searchContainer: {
    position: "absolute",
    top: 115,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    zIndex: 1, // Ensure the SearchBar is above other components
  },
  innerContainer: {
    paddingTop: 280, // Add padding to make room for SearchBar
  },
  textContainer: {
    top: -30,
    //expo
    //top: 20,
  },
  scrollContainer: {
    //height: 500,
    height: 500,
    marginTop: 5,
    //bottom: -20,
    bottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  lengthText: {
    left: 20,
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

export default AppartmentPage;
