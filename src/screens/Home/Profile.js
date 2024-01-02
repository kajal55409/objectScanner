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
  ActivityIndicator
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
import CommonStyle from "../../components/CommonStyle";
const Profile = () => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false);
  const [name, setName] = useState("");
  const [Email, setemail] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [PublisherTypeProfile, setPublisherTypeProfile] = useState('')

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      usersCollection();
    });
    return unsubscribe;
  }, [navigation]);
  const usersCollection = () => {
    setisLoading(true);
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        setisLoading(false);
        if (snapshot.exists) {
          setemail(snapshot.data());
          setName(snapshot.data());
          setMobileNumber(snapshot.data());
          setPublisherTypeProfile(snapshot.data());
        } else {
          console.log("User does not exist");
        }
      });
  };

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
  const savedata = (data) => {
    firebase.firestore().collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update(data).then(() => {
        //here the currentuser.uid is undefined so we need to take uid from firebase.auth().currentuser.uid itself.

          props.navigation.push("backtoprofile", {uid: firebase.auth().currentUser.uid})
      })
}
  return (
    <SafeAreaView style={CommonStyle.SafeareaViewCommanStyle}>
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
          <Text style={styles.textstyle}>{name.name}</Text>

          <View style={{ padding: 20 }}>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.headingtextstyle}>Full Name</Text>
              <View style={styles.bordertextstyleView}>
                <Text style={styles.Bordertextstyle}>{name.name}</Text>
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
                  {MobileNumber.phoneNumber}
                </Text>
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.headingtextstyle}>Publisher Type</Text>
              <View style={styles.bordertextstyleView}>
                <Text style={styles.Bordertextstyle}>
                  {PublisherTypeProfile.publisherType}
                </Text>
              </View>
            </View>
          </View>
          <Pressable
            style={styles.button}
            onPress={() => {
              savedata();
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
              Update profile
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, {  }]}
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
      {isLoading ? (
        <ActivityIndicator
          style={{
            position: "absolute",
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
          }}
          color="black"
          size="large"
        />
      ) : null}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    height: 200,
    backgroundColor: "black",
    justifyContent: "center",
  },
  profiledetails: {
    padding: 10,
    backgroundColor: "white",
    flex: 1,
    height: 490,
    marginTop: -50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginBottom:60
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
