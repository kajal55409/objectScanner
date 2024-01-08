import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome5,
  FontAwesome,
  AntDesign,
  Feather,
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import colors from "../../Utils/Colors";
import image from "../../Utils/image";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../../../config";
const Sign_up = () => {
  const [Name, setName] = useState();
  const [email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [PhoneNumber, setPhoneNumber] = useState();
  const navigation = useNavigation();

  registerUser = async (email, Password, Name, PhoneNumber) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, Password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://objectscanner-5854a.firebaseapp.com",
          })
          .then(() => {
            alert("Verification Email sent");
          })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                email,
                Name,
                PhoneNumber,
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      })

      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <View
            style={{
              marginTop: 50,
              borderWidth: 2,
              height: 130,
              width: 130,
              borderRadius: 75,
              justifyContent: "center",
              alignSelf: "center",
              bottom: 10,
              borderColor: "gray",
            }}
          >
            <SimpleLineIcons
              name="user-follow"
              size={50}
              color="gray"
              style={{ alignSelf: "center" }}
            />
          </View>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              color: "gray",
              fontSize: 18,
            }}
          >
            Sign Up
          </Text>
          <View style={{}}>
            <View
              style={[
                styles.Inputview,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              ]}
            >
              <TextInput
                placeholder="Full Name"
                value={Name}
                onChangeText={(text) => setName(text)}
                placeholderTextColor="gray"
                style={{ marginHorizontal: 13 }}
              />
              <FontAwesome5 name="user" size={18} color="gray" />
            </View>
            <View
              style={[
                styles.Inputview,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              ]}
            >
              <TextInput
                placeholder="Phone Number"
                value={PhoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                placeholderTextColor="gray"
                style={{ marginHorizontal: 13 }}
              />
              <FontAwesome name="mobile-phone" size={25} color="gray" />
            </View>

            <View
              style={[
                styles.Inputview,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              ]}
            >
              <TextInput
                placeholder="E-mail"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="gray"
                style={{ marginHorizontal: 13 }}
              />
              <Fontisto name="email" size={18} color="gray" />
            </View>
            <View
              style={[
                styles.Inputview,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              ]}
            >
              <TextInput
                placeholder="Password"
                value={Password}
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor="gray"
                style={{ marginHorizontal: 13 }}
              />
              <Ionicons name="eye-outline" size={22} color="gray" />
            </View>

            <Pressable
              // onPress={() => navigation.navigate("Forgot_Otp")}
              onPress={() => registerUser(email, Password, Name, PhoneNumber)}
              style={styles.button}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "600",
                  color: "white",
                }}
              >
                Sign up
              </Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Login")}
              style={{
                marginTop: 20,
                flexDirection: "row",
                alignSelf: "center",
              }}
            >
              <Text style={styles.forgot_text}>Already have an account? </Text>
              <Text
                style={[
                  styles.forgot_text,
                  { color: "black", fontWeight: "600" },
                ]}
              >
                Log In.
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sign_up;

const styles = StyleSheet.create({
  Inputview: {
    // backgroundColor: colors.secondary,
    height: 50,
    borderRadius: 4,
    borderWidth: 1,

    borderColor: "lightgray",
    // justifyContent: "center",
    padding: 13,
    fontSize: 14,
    color: "black",
    marginTop: 20,

    // backgroundColor: "red",
  },

  button: {
    backgroundColor: colors.blue,
    height: 50,
    justifyContent: "center",
    borderRadius: 5,
    marginTop: "5%",
    // marginHorizontal: 20,
  },
  image: {
    // height: "50%",
    width: "40%",
    alignSelf: "center",
    // marginTop: 70,
  },
  forgot_text: {
    fontSize: 13,
    fontWeight: "400",
    color: "gray",
    textAlign: "center",
  },

  border_line: {
    width: 150,
    borderColor: "gray",
    borderBottomWidth: 0.5,
    alignSelf: "center",
    marginHorizontal: 5,
  },
});
