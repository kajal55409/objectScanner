// import {
//   Button,
//   StyleSheet,
//   Text,
//   View,
//   Pressable,
//   Image,
//   SafeAreaView,
// } from "react-native";
// import React from "react";
// import { useNavigation } from "@react-navigation/native";
// import colors from "../../../Utils/Colors";
// import image from "../../../Utils/image";

// const Landing = () => {
//   const navigation = useNavigation();
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={{ flex: 1, top: "25%" }}>
//         <Image source={image.logo} resizeMode="contain" style={styles.image} />

//         <View
//           style={{
//             alignSelf: "center",
//             width: "95%",
//             // backgroundColor: "red",
//             bottom: 60,
//           }}
//         >
//           <Pressable
//             style={styles.Button}
//             onPress={() => navigation.navigate("Sign_up")}
//           >
//             <Text style={styles.buttontext}>Create a new account</Text>
//           </Pressable>

//           <Pressable
//             // style={styles.Button}
//             onPress={() => navigation.navigate("Login")}
//           >
//             <Text
//               style={[
//                 styles.buttontext,
//                 { color: colors.blue, fontWeight: "800", top: 20 },
//               ]}
//             >
//               Log in
//             </Text>
//           </Pressable>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Landing;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",

//     backgroundColor: "white",
//   },
//   Button: {
//     height: 49,
//     // width: 120,
//     // width: "95%",
//     backgroundColor: colors.blue,
//     justifyContent: "center",
//     // bottom: 70,
//     marginHorizontal: 5,
//     borderRadius: 9,
//   },
//   buttontext: {
//     color: "white",
//     textAlign: "center",
//     fontWeight: "800",
//   },
//   image: {
//     // height: "50%",
//     width: "50%",
//     alignSelf: "center",
//   },
// });
