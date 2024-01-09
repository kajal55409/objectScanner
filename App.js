import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Route from "./src/Utils/Route";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="white"
        hidden={false}
        barStyle={Platform.OS === "android" ? "dark-content" : "light-content"}
      />
      <Route />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
