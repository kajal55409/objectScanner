

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Pressable
} from "react-native";
import React from "react";
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
import CommonStyle from "../../components/CommonStyle";
const Object_scanner = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Header headername="Scan the Product" />
      <ScrollView>
        <View style={{padding:20,marginTop:250}}>
        <Pressable
            style={CommonStyle.button}
            onPress={() => navigation.navigate("ProductAdd")}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "600",
                color: "white",
              }}
            >
              Open the Camera
            </Text>
          </Pressable>
        <Pressable
            style={CommonStyle.button}
            onPress={() => navigation.navigate("ProductAdd")}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "600",
                color: "white",
              }}
            >
              Open the Gallery
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Object_scanner;

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "black",
    justifyContent: "center",
  },
});