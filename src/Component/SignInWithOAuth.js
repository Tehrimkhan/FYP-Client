// import React from "react";
// import { Text, StyleSheet, TouchableOpacity } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import { Button } from "react-native";
// import { useOAuth } from "@clerk/clerk-expo";
// import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";

// WebBrowser.maybeCompleteAuthSession();

// const SignInWithOAuth = () => {
//   // Warm up the android browser to improve UX
//   // https://docs.expo.dev/guides/authentication/#improving-user-experience
//   useWarmUpBrowser();

//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   const onPress = React.useCallback(async () => {
//     try {
//       const { createdSessionId, signIn, signUp, setActive } =
//         await startOAuthFlow();

//       if (createdSessionId) {
//         setActive({ session: createdSessionId });
//       } else {
//         // Use signIn or signUp for next steps such as MFA
//       }
//     } catch (err) {
//       console.error("OAuth error", err);
//     }
//   }, []);

//   return (
//     <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
//       <Text style={styles.buttonText}>SIGN IN WITH GOOGLE</Text>
//     </TouchableOpacity>
//   );
// };
// const styles = StyleSheet.create({
//   buttonStyle: {
//     marginTop: 20,
//     backgroundColor: "#009688",
//     borderRadius: 10,
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//   },
//   buttonText: {
//     fontSize: 18,
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
// });
// export default SignInWithOAuth;
