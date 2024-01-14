import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
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
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../../../config";
const Object_scanner = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [PublisherType, setPublisherType] = useState("");
  // useEffect(()=>{
  //   usersCollection();
  // },[1]);
  // useEffect(() => {
  //   const getBarCodeScannerPermissions = async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   };

  //   getBarCodeScannerPermissions();
  //   usersCollection();
  // }, []);

  // const handleBarCodeScanned = ({ type, data }) => {
  //   setScanned(true);
  //   alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  // };

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  // const usersCollection = async () => {
  //   // setisLoading(true);
  //   const snapshot = await firebase.firestore().collection("products").get();
  //   const collection = [];
  //   snapshot.forEach((doc) => {
  //     collection.push(doc.data()); 
  //     // collection[doc.id] = doc.data();
  //   }); 
  //   console.log('flatlist item',JSON.stringify(collection));
  //   setPublisherType(JSON.stringify(collection));
  //   console.log('resultttt',PublisherType)
  //   // setisLoading(false);
  //   return collection;

  // };

  return (
    // <SafeAreaView>

    <View style={styles.container}>
      <Header headername="Scan the Product" />
      {/* <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )} */}
      <Text>hii</Text>
    </View>

    // </SafeAreaView>
  );
};

export default Object_scanner;

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "black",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
