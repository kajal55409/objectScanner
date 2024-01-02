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
  ActivityIndicator
} from "react-native";
import React, { useState, useEffect } from "react";
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
import { firebase } from "../../../config";
const Home = () => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false);
  const [ProductListInfo, setProductListInfo] = useState([]);
  const [ListTitle, setListTitle] = useState("");
  const [ListDescription, setListDescription] = useState("");
  const [ListImages, setListImages] = useState("");
  const [ListLogo, setListLogo] = useState("");
  const [PublisherType, setPublisherType] = useState('');
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
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      usersCollection();
      usersCollectionSignUp();
    });
    return unsubscribe;
  }, [navigation]);
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
  const renderProductItem = ({ item,index }) => {
    // console.log('item here',item.productInfo[0].description)
    return (

    <TouchableOpacity onPress={() => navigation.navigate("ProductDetails",
    {productID:item})}>
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
            defaultSource={require('../../Assets/splash.png')}
              source={item.img}
              style={{
                borderRadius: 5,
                width: 70,
                height: 70,
                left: 22,
                top: 0,
              }}
            />
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
                  {/* {item.productInfo[0].title} */}
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
                   Rs. {item.price}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )};



  const usersCollection = async () => {
    setisLoading(true);
    const snapshot = await firebase.firestore()
    .collection('products')
    .get()
    const collection = []
    snapshot.forEach(doc => {
      collection.push(doc.data())
        // collection[doc.id] = doc.data();
    });
    // console.log('flatlist item',JSON.stringify(collection));
    setProductListInfo(collection);
    setisLoading(false);
    return collection
  };


  const usersCollectionSignUp = () => {
    // console.log('CurrentUID',firebase.auth().currentUser.uid)
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setPublisherType(snapshot.data())
        } else {
          console.log("User does not exist");
        }
      });
  };



  
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
            marginHorizontal: 20,
            width: "10%",
            marginTop: Platform.OS === "android" ? 20 : 0,

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
            alignSelf:'center'
          }}
        >
      
            <View style={{marginBottom:180}}>
              <FlatList
                nestedScrollEnabled={false}
                data={ProductListInfo}
                renderItem={renderProductItem}
                ItemSeparatorComponent={renderSeparator}
                keyExtractor={(item) => item.id}
              />
            </View>
          {/* ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 30,
              }}
            >
              <Text style={{ fontWeight: "600", color: "gray", fontSize: 20 }}>
                Data not found
              </Text>
            </View>
          )} */}
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

        {PublisherType.publisherType === 'Yes' ?
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
          : null}
        {PublisherType.publisherType === 'No' ? <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Object_scanner")}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "600",
              color: "white",
            }}
          >
            Scan the Products
          </Text>
        </Pressable> : null}


      </View>
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
