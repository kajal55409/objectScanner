import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";
const Forgot_Password = () => {
  const navigation = useNavigation();

  const [Password, setPassword] = useState();
  const [ConfirmPassword, setConfirmPassword] = useState("");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 20 }}>
        <View style={{ top: 60 }}>
          <Text style={styles.heading}>Create New Password</Text>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 20,
              alignSelf: "center",
            }}
          >
            <Text style={styles.heading2}>
              Your new password must be different from previous used passwords.
            </Text>
          </View>

          <View
            style={[
              styles.Inputview,
              {
                marginTop: "5%",
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
              keyboardType="name-phone-pad"
            />
            <Ionicons name="eye" size={24} color="gray" />
          </View>
          <View style={styles.Inputview}>
            <TextInput
              placeholder="Confirmation code"
              value={ConfirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              placeholderTextColor="gray"
              keyboardType="number-pad"
            />
          </View>

          <Pressable
            onPress={() => navigation.navigate("Login")}
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
              Save
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Forgot_Password;

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: "400",
    textAlign: "center",
  },
  heading2: {
    fontWeight: "400",
    color: "gray",
  },
  Inputview: {
    // backgroundColor: "",
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
  forgot_text: {
    fontSize: 13,
    fontWeight: "400",
    color: "gray",
    textAlign: "center",
  },
});
