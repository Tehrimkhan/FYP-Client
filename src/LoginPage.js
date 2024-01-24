import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "./context/authContext";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API } from "./api/config";
import axios from "axios";

const logo = require("../assets/logoW.png");
const headlogo = require("../assets/download.png");
const midImage = require("../assets/innerImage.png");

const LoginPage = ({ navigation }) => {
  //GLOBAL STATE
  const [state, setState] = useContext(AuthContext);
  //STATE
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [userId, setUserId] = useState(null);
  // console.log("loginapasd", userId);
  const submit = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Please Fill All Fields!");
      } else {
        // console.log("DATA=>>", email, password);
        const data = await API.post(
          "login",
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );

        API.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.token}`;

        // console.log("Check ==== > ", data);

        if (data && data.data) {
          setState(data);
          await AsyncStorage.setItem("@auth", JSON.stringify(data));
          Alert.alert("You are Signed In!");

          // UPDATE userId STATE HERE
          setUserId(data.data.user._id);
          // console.log(data.data.user._id);
          // Pass userId as a prop to the Dashboard screen
          navigation.navigate("Dashboard", { userId: userId });
        } else {
          alert("Data is undefined");
        }
      }
    } catch (error) {
      alert(error.data ? error.data.data.message : "Invalid Credentials!");
      console.log(error);
    }
  };
  const signin = () => {
    navigation.navigate("SignUp");
  };
  //Temp funct to check local storage
  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
    // console.log("LocalStorage => ", data);
  };
  getLocalStorageData();
  return (
    <View style={styles.bgContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={headlogo}
          style={styles.headStyle}
          resizeMode="contain"
        />
      </View>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.header}>FLEX SHARE</Text>
      <Text style={styles.lowerheader}>LET’S SUBSCRIBE</Text>
      <Image source={midImage} style={styles.midImage} resizeMode="contain" />
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="ENTER YOUR EMAIL"
            autoCapitalize="none"
            placeholderTextColor="white"
            autoCorrect={false}
            value={email}
            onChangeText={(actualData) => setemail(actualData)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="ENTER YOUR PASSWORD"
            placeholderTextColor="white"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            value={password}
            onChangeText={(actualData) => setPassword(actualData)}
          />
        </View>

        <View style={styles.wrapper}>
          <Checkbox
            value={agree}
            onValueChange={() => setAgree(!agree)}
            color={agree ? "#4630EB" : undefined}
            borderRadius="1px"
            solid
          />
          <Text style={styles.wrapperText}>
            I AGREE TO TERMS AND CONDITIONS!
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.buttonStyle,
            { backgroundColor: agree ? "#32A1A8" : "grey" },
          ]}
          disabled={!agree}
          onPress={() => submit()}
        >
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
        <View style={styles.lowerContainer}>
          <Text style={styles.lowerText}>Don't have an account ? </Text>
          <TouchableOpacity onPress={() => signin()}>
            <Text style={styles.signupText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    position: "absolute",
    bottom: "69%",
    left: 0,
  },
  headStyle: {
    top: -10,
    width: 210,
    height: 300,
  },
  headerContainer: {
    width: 250, // Increase the width of the header image container
    height: 250, // Increase the height of the header image container
    bottom: 270,
  },
  headerImageStyle: {
    width: "100%", // Make the header image fill the container width
    height: "100%", // Make the header image fill the container height
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    color: "rgba(0, 0, 0, 0.81)",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "700",
  },
  lowerheader: {
    color: "rgba(0, 0, 0, 0.58)",
    fontSize: 14,
    marginBottom: 30,
    fontWeight: "bold",
  },
  midImage: {
    width: 142,
    height: 144,
  },
  logo: {
    display: "flex",
    width: 110,
    height: 91,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  mainContainer: {
    height: "100%",
  },
  innerContainer: {
    borderRadius: 10,
    padding: 20,
  },
  mainHeader: {
    borderRadius: 10,
    paddingHorizontal: 100,
    justifyContent: "center",
    fontFamily: "serif",
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputStyle: {
    borderColor: "rgba(160, 97, 106, 0.47)",
    backgroundColor: "rgba(160, 97, 106, 0.47)",
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 100,
    width: 340,
    height: 61,
    fontSize: 16,
  },
  buttonStyle: {
    marginTop: 20,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  wrapper: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  wrapperText: {
    marginLeft: 10,
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  signupText: {
    fontWeight: "bold",
    color: "#32A1A8",
    fontSize: 16,
    alignItems: "center",
    marginTop: 10,
  },
  lowerContainer: {
    fontSize: 16,
    fontWeight: "bold",
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center", // Center horizontally
  },
  lowerText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginPage;
