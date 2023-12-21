import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

// PROVIDER
const AuthProvider = ({ children }) => {
  // GLOBAL STATE
  const [userId, setUserId] = useState({
    userId: null,
  });
  // const [userName, setUserName] = useState({
  //   name: null,
  // });
  // const [userEmail, setUserEmail] = useState({
  //   email: null,
  // });
  // const [userImage, setUserImage] = useState({
  //   profileImage: null,
  // });

  // INITIAL LOCAL STORAGE DATA
  useEffect(() => {
    const getLocalStorageData = async () => {
      try {
        let data = await AsyncStorage.getItem("@auth");
        let loginData = JSON.parse(data);
        setUserId(loginData?.data?.user?._id || null);
        // setUserName(loginData?.data?.user?.name || null);
        // setUserEmail(loginData?.data?.user?.email || null);
        // setUserImage(loginData?.data?.user?.profileImage[0]?.url || null);
        // console.log("User ID:", loginData?.data?.user?._id);
        // console.log("User name:", loginData?.data?.user?.name);
        // console.log("User email:", loginData?.data?.user?.email);
        // console.log("User Image:", loginData?.data?.user?.profileImage[0]?.url);
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    };

    getLocalStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={[
        userId,
        setUserId,
        // userName,
        // setUserName,
        // userImage,
        // setUserImage,
        // userEmail,
        // setUserEmail,
      ]}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
