import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Header from "../../components/Header";
import { WebView } from "react-native-webview";
import {
  FontAwesome5,
  AntDesign,
  Feather,
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Web_page = () => {
  const navigation = useNavigation();
  return (
    <>
    <SafeAreaView />
    <Header headername={'Web page'} />
    <WebView
      style={{ width: "100%", height: "100%", flex: 1 }}
      source={{ uri: "https://www.amazon.in/ref=nav_logo" }}
    //   source={{ uri: web_url }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      scalesPageToFit={true}
    />
  </>
  );
};

export default Web_page;

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "black",
    justifyContent: "center",
  },
});
