import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  FlatList,
  Image,
  Platform,
} from "react-native";
import React from "react";
import Header from "../../components/Header";
import { StatusBar } from "expo-status-bar";
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

const Home = () => {
  const navigation = useNavigation();

  const DATA = [
    {
      id: "1",
      title: "Reacto Disc 5000 Carbon Rod",
      description: "Merida Black 2021",
      date: "2021.10.27",
      img: require("../../Assets/splash.png"),
      money: "3,400,000 ",
      stock: "in stock",
    },
    {
      id: "2",
      title: "Reacto Disc 5000 Carbon Rod",
      description: "Merida Black 2021",
      date: "2021.10.28",
      img: require("../../Assets/splash.png"),
      money: "3,400,000 ",
      date: "2020.01.01",
      stock: "in stock",
    },
    {
      id: "3",
      title: "Reacto Disc 5000 Carbon Rod",
      description: "Merida Black 2021",
      date: "2021.10.29",
      img: require("../../Assets/splash.png"),
      money: "3,400,000 ",
      date: "2020.01.01",
      stock: "in stock",
    },
    {
      id: "4",
      title: "Reacto Disc 5000 Carbon Rod",
      description: "Merida Black 2021",
      date: "2021.10.29",
      img: require("../../Assets/splash.png"),
      money: "3,400,000 ",
      date: "2020.01.01",
      stock: "in stock",
    },
    {
      id: "5",
      title: "Reacto Disc 5000 Carbon Rod",
      description: "Merida Black 2021",
      date: "2021.10.29",
      img: require("../../Assets/splash.png"),
      money: "3,400,000 ",
      date: "2020.01.01",
      stock: "No stock",
    },

    {
      id: "5",
      title: "Reacto Disc 5000 Carbon Rod",
      description: "Merida Black 2021",
      date: "2021.10.29",
      img: require("../../Assets/splash.png"),
      money: "3,400,000 ",
      date: "2020.01.01",
      stock: "No stock",
    },
    {
      id: "5",
      title: "Reacto Disc 5000 Carbon Rod",
      description: "Merida Black 2021",
      date: "2021.10.29",
      img: require("../../Assets/splash.png"),
      money: "3,400,000 ",
      date: "2020.01.01",
      stock: "No stock",
    },
  ];
  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#d2d2d2",
          margin: 5,
        }}
      />
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("ProductDetails")}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          marginTop: "5%",
          marginBottom: "5%",
        }}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Image
              source={item.img}
              style={{
                borderRadius: 5,
                width: 70,
                height: 70,
                left: 22,
                top: 0,
              }}
            />
            {/* <Image
              source={require("../../img/heart.png")}
              resizeMode="contain"
              style={{
                width: 17,
                marginTop: 49,

                height: 17,
                marginBottom: 20,
              }}
            /> */}
          </View>
          <View style={{ flex: 2.5, flexDirection: "row" }}>
            <View style={{ flex: 1, flexDirection: "column" }}>
              <View style={{ flex: 2, flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#282828",
                    fontWeight: "500",
                  }}
                >
                  {item.title}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: "#A3A3A3",
                  fontWeight: "400",
                }}
              >
                {item.description}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "1%",
                }}
              >
                <View style={{ flexDirection: "row", marginEnd: 10 }}>
                  <Text
                    style={{
                      color: "#282828",
                      paddingTop: "2.5%",
                      fontWeight: "700",
                      fontSize: 14,
                    }}
                  >
                    {item.money}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.commanStyle}>
      <View style={styles.header}>
        <View
          style={{
            width: "90%",
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            // alignItems: "center",
            // alignItems: "flex-end",
            marginHorizontal: 20,
            // alignContent: "center",
            width: "10%",
            marginTop: Platform.OS === "android" ? 20 : 0,
            // height: 60,
            // backgroundColor: "white",
          }}
          onPress={() => navigation.navigate("Profile")}
        >
          <FontAwesome5 name="user" size={18} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            height: "100%",
            width: "90%",
          }}
        >
          <View>
            <FlatList
              nestedScrollEnabled={false}
              data={DATA}
              renderItem={renderItem}
              ItemSeparatorComponent={renderSeparator}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          width: "90%",
          alignSelf: "center",
          bottom: Platform.OS === "ios" ? 45 : 10,
        }}
      >
        <Pressable
          style={styles.button}
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
            Add the Products
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
  },
  button: {
    backgroundColor: colors.blue,
    height: 50,
    // width: 70,
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: 10,

    // marginTop: "85%",
    // marginHorizontal: 20,
  },
  commanStyle: {
    backgroundColor: "white",
    height: "100%",
  },
});
