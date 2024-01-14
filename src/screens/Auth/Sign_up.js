import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
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
  Entypo,
} from "@expo/vector-icons";
import Modal from "react-native-modal";
import colors from "../../Utils/Colors";
import image from "../../Utils/image";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../../../config";
import CommonStyle from "../../components/CommonStyle";
const Sign_up = () => {
  const [Name, setName] = useState('minu');
  const [email, setEmail] = useState('kajalgupta.er@gmail.com');
  const [Password, setPassword] = useState('123456');
  const [PhoneNumber, setPhoneNumber] = useState('9430957355');
  const [SignUpItem, setSignUpItem] = useState('')
  const [Category, setCategory] = useState("");
  const [ModalPopup, setModalPopup] = useState(false);
  const [categorylist, setcategorylist] = useState([
    {
      id: 1,
      category: "Yes",
    },
    {
      id: 2,
      category: "No",
    },
  ]);
  const toggleModal = () => {
    setModalPopup(!ModalPopup);
  };
  const navigation = useNavigation();

  registerUser = async (email, Password, Name, PhoneNumber) => {

    // const SignupArray = [];
    // SignupArray.push({
    //   email: email,
    //   name: Name,
    //   phoneNumber: PhoneNumber,
    //   publisherType: Category.category,
    // });
    // setSignUpItem(SignupArray)
    const db = firebase .firestore().collection("users").doc();
    const SignupId = db.id;
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
      
            alert("Signup Successfully");
            navigation.navigate("Login");
          })
          .catch((error) => {
            alert(error.message);
          })
          .then((res) => {
            // console.log("sign up info ", res);
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                email: email,
                name: Name,
                phoneNumber: PhoneNumber,
                publisherType: Category.category,
                signupId:SignupId,
                // userId: auth().currentUser.uid,
              });
            // alert('Sign up successfully')
            navigation.navigate("Home");
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

            <Text
              style={[
                CommonStyle.headingText,
                { marginTop: 20, fontSize: 15, color: "grey" },
              ]}
            >
              Are you publisher ?
            </Text>
            <Pressable
              style={CommonStyle.InputView}
              onPress={() => toggleModal()}
            >
              <Text style={{ color: "grey" }}>
                {Category == "" ? "Select the category" : Category.category}
              </Text>
              <AntDesign name="caretdown" size={18} color="#B7B7B7" />
            </Pressable>

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
      <Modal
        animationType="fade"
        transparent={true}
        visible={ModalPopup}
        activeOpacity={0.3}
        onRequestClose={() => {
          setModalPopup(!ModalPopup);
        }}
        style={{
          width: "100%",
          height: "100%",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <View style={CommonStyle.backgroundView} />

        <View
          style={[
            CommonStyle.modalView,
            {
              height: "30%",
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ alignItems: "flex-start" }}>
              {/* {static_Content.static_Data.inquiry_selectinquiryModal_txt} */}
              Select the Yes Or No
            </Text>
            <TouchableOpacity
              style={{ alignItems: "flex-end" }}
              onPress={() => setModalPopup(!ModalPopup)}
            >
              <Entypo name="circle-with-cross" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              {categorylist.map((item, index) => {
                return (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        console.log("item is ", item);
                        // setcategorylist(item);
                        setCategory(item);
                        setModalPopup(!ModalPopup);
                      }}
                      style={[
                        CommonStyle.serachaddress_postal,
                        {
                          height: 50,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontSize: 18,
                          textAlign: "center",
                        }}
                      >
                        {item.category}
                      </Text>
                    </TouchableOpacity>
                  </>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* </View> */}
      </Modal>
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
