import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import LoginPage from "./src/LoginPage";
import Dashboard from "./src/Pages/Dashboard";
import MainPage from "./src/MainPage";
import SignUp from "./src/SignUp";
import CarPage from "./src/DashboardPages/CarPage";
import ApparelsPage from "./src/DashboardPages/ApparelsPage";
import AppartmentPage from "./src/DashboardPages/AppartmentPage";
import FurniturePage from "./src/DashboardPages/FurniturePage";
import HomePage from "./src/NavbarPages/HomePage";
import ChatPage from "./src/NavbarPages/ChatPage";
import SellerPage from "./src/NavbarPages/SellerPage";
import MyAdsPage from "./src/NavbarPages/MyAdsPage";
import YouPage from "./src/NavbarPages/YouPage";

import FurnitureAdPage from "./src/AdPages/FurnitureAdPage";
import ApparelAdPage from "./src/AdPages/ApparelAdPage";
import CarAdPage from "./src/AdPages/CarAdPage";
import AppartmentAdPage from "./src/AdPages/AppartmentAdPage";
import imagePicker from "./src/Component/SelectImage";
import { AuthProvider } from "./src/context/authContext";
import { PostProvider } from "./src/context/postContext";
import MyPage from "./src/NavbarPages/MyPage";

import PostDetailScreen from "./src/Component/DetailScreen/PostDetailScreen";
import PaymentPage from "./src/Payment/PaymentPage";
import ChatMessagePage from "./src/Component/ChatMessagePage";
import SearchUsersPage from "./src/Component/SearchUsersPage";
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    appfont: require("./assets/Fonts/PlayfairDisplay-ExtraBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <PostProvider>
          <Stack.Navigator
            initialRouteName="LoginPage"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="MyPage" component={MyPage} />
            <Stack.Screen name="MainPage" component={MainPage} />
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="CarPage" component={CarPage} />
            <Stack.Screen name="ApparelsPage" component={ApparelsPage} />
            <Stack.Screen name="AppartmentPage" component={AppartmentPage} />
            <Stack.Screen name="FurniturePage" component={FurniturePage} />
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="ChatPage" component={ChatPage} />
            <Stack.Screen name="SellerPage" component={SellerPage} />
            <Stack.Screen name="MyAdsPage" component={MyAdsPage} />
            <Stack.Screen name="YouPage" component={YouPage} />
            <Stack.Screen name="ApparelAdPage" component={ApparelAdPage} />
            <Stack.Screen
              name="appartmentAdPage"
              component={AppartmentAdPage}
            />
            <Stack.Screen name="CarAdPage" component={CarAdPage} />
            <Stack.Screen name="FurnitureAdPage" component={FurnitureAdPage} />
            <Stack.Screen
              name="PostDetailScreen"
              component={PostDetailScreen}
            />
            <Stack.Screen name="PaymentPage" component={PaymentPage} />
            <Stack.Screen name="ChatMessagePage" component={ChatMessagePage} />
            <Stack.Screen name="SearchUsersPage" component={SearchUsersPage} />
          </Stack.Navigator>
        </PostProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
