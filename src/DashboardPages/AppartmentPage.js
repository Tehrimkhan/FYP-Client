import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import Menu from "../Component/Menu";
import Background from "../Component/Background";
import AdsCards from "../Component/Banner/AdsCards";
import SearchBar from "../Component/Home/SearchBar";
import applogo from "../../assets/apartlogo.png";
import { AuthContext } from "../context/authContext";

// Your AppartmentPage component
const AppartmentPage = ({ route }) => {
  const { apartmentPosts } = route.params;
  const [userIdArray] = useContext(AuthContext);
  const userId = userIdArray?.data?.user?._id;
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const windowHeight = Dimensions.get("window").height;
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

      <View style={styles.searchContainer}>
        <SearchBar
          setSearchText={(value) => setSearchText(value)}
          imageSource={applogo}
          placeholder="SEARCH YOUR APPARTMENT"
          setSortOption={setSortOption}
        />
      </View>

      <View style={styles.innerContainer}>
        {isLoading ? (
          <View style={styles.spinnerContainer}>
            <Image
              source={require("../../assets/Spinner-1s-200px.gif")}
              style={{ width: 50, height: 50 }}
            />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              minHeight: windowHeight - 280,
            }}
          >
            <AdsCards
              posts={apartmentPosts}
              userId={userId}
              searchText={searchText}
              sortOption={sortOption}
            />
          </ScrollView>
        )}
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
    position: "relative",
    backgroundColor: "#17171f",
  },
  bgcontainer: {
    position: "absolute",
  },
  searchContainer: {
    position: "absolute",
    top: 115,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    zIndex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingTop: 200,
    marginBottom: 50,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
