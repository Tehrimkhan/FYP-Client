import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Checkbox from "expo-checkbox";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  useSession,
} from "@clerk/clerk-expo";
import SignInWithOAuth from "./Component/SignInWithOAuth";
import Dashboard from "./Pages/Dashboard";
import LoginPage from "./LoginPage";
import axios from "axios";
import { API } from "./api/config";

const logo = require("../assets/logoW.png");
const headlogo = require("../assets/download.png");

const SignUp = ({ navigation }) => {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const submit = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isPasswordMatch = password === confirmPassword;

    try {
      if (!name || !email || !password || !confirmPassword) {
        Alert.alert("Please Fill All Fields!");
      } else if (!isEmailValid) {
        Alert.alert("Invalid email format!");
      } else if (!isPasswordValid) {
        Alert.alert("Password must be at least 6 characters long!");
      } else if (!isPasswordMatch) {
        Alert.alert("Password and Confirm Password do not match!");
      } else {
        console.log("DATA=>>", name, email, password, confirmPassword);
        const data = await API.post("/register", {
          name,
          email,
          password,
          confirmPassword,
        });
        console.log("Check", data);
        if (data && data.data) {
          alert(data);
          // console.log("DATA=>>", name, email, password, confirmPassword);
          Alert.alert("You are Registered SucessFully!");
          navigation.navigate("LoginPage");
        } else {
          alert("data data is undefined");
        }
      }
    } catch (error) {
      alert(error.data ? error.data.data.message : "Unknown error occurred");
      console.log(error);
    }
  };
  const logIn = () => {
    navigation.navigate("LoginPage");
  };
  return (
    <View style={styles.bgContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={headlogo}
          style={styles.headStyle}
          resizeMode="contain"
        />
      </View>
      <View style={styles.headerContainer}></View>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.header}>FLEX SHARE</Text>

      <Text style={styles.lowerheader}>LET’S SUBSCRIBE</Text>
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
            placeholder="ENTER YOUR NAME"
            autoCapitalize="none"
            placeholderTextColor="white"
            autoCorrect={false}
            value={name}
            onChangeText={(actualData) => setname(actualData)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="ENTER YOUR PASSWORD"
            autoCapitalize="none"
            placeholderTextColor="white"
            autoCorrect={false}
            secureTextEntry={true}
            value={password}
            onChangeText={(actualData) => setPassword(actualData)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="CONFIRM YOUR PASSWORD"
            autoCapitalize="none"
            placeholderTextColor="white"
            autoCorrect={false}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(actualData) => setconfirmPassword(actualData)}
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
            { backgroundColor: agree ? "#32A1A8" : "grey", marginTop: 20 },
          ]}
          disabled={!agree}
          onPress={() => submit()}
        >
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
        {/* 
        <ClerkProvider
          publishableKey={
            "pk_test_YXB0LXRlcnJhcGluLTkzLmNsZXJrLmFjY291bnRzLmRldiQ"
          }
        >
          <SafeAreaView style={{ flex: 1 }}>
            <SignedIn>
              <Dashboard />
            </SignedIn>
            <SignedOut>
              <SignInWithOAuth />
            </SignedOut>
          </SafeAreaView>
        </ClerkProvider> */}
        <View style={styles.lowerContainer}>
          <Text style={styles.lowerText}>Already have an account ? </Text>
          <TouchableOpacity onPress={() => logIn()}>
            <Text style={styles.signupText}>Log In</Text>
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
    bottom: "70%",
    left: 0,
  },

  /* innerContainer: {
      borderRadius: 10,
      padding: 20,
    },
  */
  headStyle: {
    top: -5,
    width: 210,
    height: 300,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50, // Adjust the marginBottom for spacing
  },
  headerImageStyle: {
    width: "100%",
    height: "100%",
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
    marginLeft: 10,
  },
  lowerheader: {
    color: "rgba(0, 0, 0, 0.58)",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "700",
    marginBottom: 20,
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

    // marginTop: 40,
    // marginBottom: -30,
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
    marginTop: 35,
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
    marginTop: 1,
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
  signupText: {
    fontWeight: "bold",
    color: "#32A1A8",
    fontSize: 16,
    alignItems: "center",
    marginTop: 10,
  },
});

export default SignUp;
