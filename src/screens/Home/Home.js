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
  ActivityIndicator,
  RefreshControl,
  Button
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from 'react-native-qrcode-svg';
const Home = () => {
  let onEndReachedCalledDuringMomentum = false;
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [ProductListInfo, setProductListInfo] = useState([]);
  const [ListTitle, setListTitle] = useState("");
  const [ListDescription, setListDescription] = useState("");
  const [ListImages, setListImages] = useState("");
  const [ListLogo, setListLogo] = useState([]);
  const [PublisherType, setPublisherType] = useState("");
  const productRef = firebase.firestore().collection("products");


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // usersCollection();
      getProductdata();
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
  const renderProductItem = ({ item, index }) => {
    // console.log('item here',item)
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetails", { productID: item })
        }
      >
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
                defaultSource={require("../../Assets/splash.png")}
                source={{uri:item.logo}}
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
     
                 {/* <QRCode
      value={item.qrcode}
      size={100} // Adjust the size of the QR code as needed
     
    /> */}
      </TouchableOpacity>
    );
  };

  onRefresh = () => {
    setTimeout(() => {
      getProductdata();
    }, 1000);
  };

  renderFooter = () => {
    if (!isMoreLoading) return true;

    return (
      <ActivityIndicator
        size="large"
        color="black"
        style={{ marginBottom: 10 }}
      />
    );
  };

  const usersCollectionSignUp = async () => {
    const user_token = await AsyncStorage.getItem("UID");
    // console.log('CurrentUID',firebase.auth().currentUser.uid)
    firebase
      .firestore()
      .collection("users")
      .doc(user_token)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setPublisherType(snapshot.data());
        } else {
          console.log("User does not exist");
        }
      });
  };
  useEffect(() => {
    getProductdata();
  }, []);

 const getProductdata = async () => {
    console.log('list')
    // setisLoading(true);

    const snapshot = await productRef.orderBy("id").limit(6).get();

    if (!snapshot.empty) {
      let newProductdata= [];

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      console.log('fgdfgflist')
      for (let i = 0; i < snapshot.docs.length; i++) {
        newProductdata.push(snapshot.docs[i].data());
      }

      setProductListInfo(newProductdata);
      console.log('peoduct',ProductListInfo)
   
    } else {
      setLastDoc(null);
    }
    console.log('check')
    setisLoading(false);
  };

  getMore = async () => {
    if (lastDoc) {
      setIsMoreLoading(true);

      setTimeout(async () => {
        let snapshot = await productRef
          .orderBy("id")
          .startAfter(lastDoc.data().id)
          .limit(3)
          .get();

        if (!snapshot.empty) {
          let newProductdata = ProductListInfo;

          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

          for (let i = 0; i < snapshot.docs.length; i++) {
            newProductdata.push(snapshot.docs[i].data());
          }

          setProductListInfo(newProductdata);
          if (snapshot.docs.length < 3) setLastDoc(null);
        } else {
          setLastDoc(null);
        }

        setIsMoreLoading(false);
      }, 1000);
    }

    onEndReachedCalledDuringMomentum = true;
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

          <Button title='click' onPress={()=>navigation.navigate('Demo')}/>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            height: "100%",
            width: "90%",
            alignSelf: "center",
          }}
        >
          <View style={{ marginBottom: 180 }}>
            <FlatList
              nestedScrollEnabled={false}
              // scrollEnabled={false} // remove warning virtulized list
              data={ProductListInfo}
              renderItem={renderProductItem}
              ItemSeparatorComponent={renderSeparator}
              keyExtractor={(item) => item.id.toString()}
              ListFooterComponent={renderFooter}
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
              }
              initialNumToRender={3}
              onEndReachedThreshold={0.1}
              onMomentumScrollBegin={() => {
                onEndReachedCalledDuringMomentum = false;
              }}
              onEndReached={() => {
                if (!onEndReachedCalledDuringMomentum && !isMoreLoading) {
                  getMore();
                }
              }}
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
        {PublisherType.publisherType === "Yes" ? (
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("ProductAdd", { type: "new" })}
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
        ) : null}
        {PublisherType.publisherType === "No" ? (
          <Pressable
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
          </Pressable>
        ) : null}
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
