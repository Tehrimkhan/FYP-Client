import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

// PROVIDER
const AuthProvider = ({ children }) => {
  // GLOBAL STATE
  const [userId, setUserId] = useState({
    userId: null,
  });
  // INITIAL LOCAL STORAGE DATA
  useEffect(() => {
    const getLocalStorageData = async () => {
      try {
        let data = await AsyncStorage.getItem("@auth");
        let loginData = JSON.parse(data);
        setUserId(loginData?.data?.user?._id || null);
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    };

    getLocalStorageData();
  }, []);

  return (
    <AuthContext.Provider value={[userId, setUserId]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
