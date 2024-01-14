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

  useEffect(() => {
    // setTimeout(() => {
    //   navigation.navigate("Login");
    // }, 3000);
    checkToken();
  }, [1]);

  const checkToken = async () => {
    const user_token = await AsyncStorage.getItem("UID");
    console.log("user token", user_token);
    setTimeout(() => {
      if (user_token != null) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }], 
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
