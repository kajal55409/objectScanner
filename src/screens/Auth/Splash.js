import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import image from "../../Utils/image";
import { firebase } from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Splash() {
  const navigation = useNavigation();

  // var auth = firebase.auth().onAuthStateChanged(function(user) {
  //   if (user) {
  //     user.getIdToken().then(function(data) {
  //       console.log('splash',data)
  //       // Save it redux, or component state(in that case you need to do this in every component where token will be used

  //      // Unsubscribe from listener
  //      auth()
  //     });
  //   } else {
  //     // User is not authenticated
  //     // Unsubscribe from listener
  //      auth()
  //   }
  // });

  useEffect(() => {
    // setTimeout(() => {
    //   navigation.navigate("Login");
    // }, 3000);
    checkToken();
  }, []);

  const checkToken = async () => {
    const user_token = await AsyncStorage.getItem("UID");
    console.log("user token", user_token);
    setTimeout(() => {
      if (user_token != null) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }], 
        });
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor={Colors.ButtonColor} animated barStyle='dark-content' networkActivityIndicatorVisible showHideTransition='slide' /> */}
      <Image source={image.splash} resizeMode="contain" style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    height: "70%",
    width: "80%",
  },
  meta_img: {
    height: "20%",
    width: "25%",
  },
});
