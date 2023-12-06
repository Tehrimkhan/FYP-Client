import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Carousel, { PaginationLight } from "react-native-x-carousel";
import axios from "axios";
import { API } from "../../api/config";

const { width } = Dimensions.get("window");

const Banner = () => {
  const [banner, setBanner] = useState();

  useEffect(() => {
    (async function getBannerImages() {
      try {
        const response = await API.get("/banner/get");

        if (response.status === 200) {
          setBanner(response.data);
        }
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    })();
  }, []);

  if (!banner) {
    return <ActivityIndicator size="large" />;
  }

  const renderItem = (data) => (
    <View style={styles.cardContainer} key={data.images.url}>
      <Image source={{ uri: data.images.url }} style={styles.carouselImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        pagination={PaginationLight}
        renderItem={renderItem}
        data={banner}
        loop
        autoplay
        itemsPerPage={1}
        horizontal={true}
        sliderWidth={width}
        itemWidth={width}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    top: 20,
  },
  carouselImage: {
    width: width * 0.99,
    height: width * 0.5,
    resizeMode: "cover",
    borderRadius: 8,
    overflow: "hidden",
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    width,
  },
});

export default Banner;
