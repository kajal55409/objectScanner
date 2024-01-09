import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  FontAwesome5,
  AntDesign,
  Feather,
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../Utils/Colors";
import { firebase } from "../../../config";
const Profile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [Email, setemail] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      usersCollection();
    });
    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(firebase.auth().currentUser.uid)
  //     .get()
  //     .then((snapshot) => {
  //       if (snapshot.exists) {
  //         setemail(snapshot.data());
  //         setName(snapshot.data());
  //         setMobileNumber(snapshot.data());
  //       } else {
  //         console.log("User does not exist");
  //       }
  //     });
  // }, []);
  const usersCollection = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setemail(snapshot.data());
          setName(snapshot.data());
          setMobileNumber(snapshot.data());
        } else {
          console.log("User does not exist");
        }
      });
  };

  //   const usersCollection = async () => {
  //     let Userid = await AsyncStorage.getItem('@yUID')
  //     firestore()
  //         .collection('users')
  //         .get()
  //         .then((collectionSnapshot) => {
  //             collectionSnapshot
  //                 .forEach(documentSnapshot => {
  //                     if (documentSnapshot.id == Userid) {
  //                         setprofileUpdate(documentSnapshot.data())
  //                         console.log("profileUpdate", documentSnapshot.data())
  //                     }
  //                 });
  //         });
  // }
  const logoutUser = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "yes",
          onPress: () => {
            firebase
              .auth()
              .signOut()
              .then(() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const ChangePassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        alert("Password reset email sent");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <SafeAreaView>
      <Header headername="Profile" />
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignSelf: "center",
              marginHorizontal: 10,
              alignContent: "center",
            }}
            onPress={() => navigation.navigate("Profile")}
          >
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
                borderColor: "white",
                borderWidth: 2,
                justifyContent: "center",
                marginTop: -30,
              }}
            >
              <FontAwesome5
                name="user-alt"
                size={60}
                color="white"
                style={{ alignSelf: "center" }}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.profiledetails}>
          <Text style={styles.textstyle}>{name.Name}</Text>
          {/* <Text
            style={[
              styles.textstyle,
              { color: "grey", fontSize: 12, marginTop: 5 },
            ]}
          >
            {Email.email}
          </Text> */}

          <View style={{ padding: 20 }}>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.headingtextstyle}>Full Name</Text>
              <View style={styles.bordertextstyleView}>
                <Text style={styles.Bordertextstyle}>{name.Name}</Text>
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.headingtextstyle}>E-mail</Text>
              <View style={styles.bordertextstyleView}>
                <Text style={styles.Bordertextstyle}>{Email.email}</Text>
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.headingtextstyle}>Phone Number</Text>
              <View style={styles.bordertextstyleView}>
                <Text style={styles.Bordertextstyle}>
                  {MobileNumber.PhoneNumber}
                </Text>
              </View>
            </View>
          </View>
          <Pressable
            style={[styles.button, { marginTop: "10%" }]}
            onPress={() => {
              ChangePassword();
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "600",
                color: "white",
              }}
            >
              Change Password
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            // onPress={() => {
            //   firebase.auth().signOut();
            // }}
            onPress={() => {
              logoutUser();
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "600",
                color: "white",
              }}
            >
              Sign out
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    height: 200,
    backgroundColor: "black",
    justifyContent: "center",
    // borderBottomLeftRadius: 50,
    // borderBottomRightRadius: 50,
  },
  profiledetails: {
    padding: 10,
    backgroundColor: "white",
    flex: 1,
    height: 490,
    marginTop: -50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  textstyle: {
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "italic",
    textAlign: "center",
    color: "black",
  },
  headingtextstyle: {
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    textAlign: "left",
    color: "black",
  },
  Bordertextstyle: {
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "left",
    color: "grey",
  },
  bordertextstyleView: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    marginTop: 10,
    paddingBottom: 3,
  },
  button: {
    backgroundColor: colors.blue,
    height: 50,
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: 10,
    // marginTop: "85%",
    // marginHorizontal: 20,
  },
});
