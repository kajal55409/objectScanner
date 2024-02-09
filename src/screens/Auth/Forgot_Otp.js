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

const Forgot_Otp = () => {
  const navigation = useNavigation();
  const [Otp, setOtp] = useState("");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 20 }}>
        <View style={{ top: 60 }}>
          <Text style={styles.heading}>Enter the Confirmation Code We </Text>
          <Text style={styles.heading}>Sent to +91 9876455789 </Text>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 20,
              alignSelf: "center",
            }}
          >
            <Text style={styles.heading2}>Change Phone Number</Text>
            <Text style={{ color: "gray" }}> or </Text>
            <Text style={styles.heading2}>resend SMS</Text>
          </View>
          <View style={styles.Inputview}>
            <TextInput
              placeholder="Confirmation code"
              value={Otp}
              onChangeText={(text) => setOtp(text)}
              placeholderTextColor="gray"
              keyboardType="number-pad"
            />
          </View>

          <Pressable
            onPress={() => navigation.navigate("Forgot_Password")}
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
              Next
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={{
              marginTop: 10,
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
    </SafeAreaView>
  );
};

export default Forgot_Otp;

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: "400",
    textAlign: "center",
  },
  heading2: {
    fontWeight: "700",
  },
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
  forgot_text: {
    fontSize: 13,
    fontWeight: "400",
    color: "gray",
    textAlign: "center",
  },
});
