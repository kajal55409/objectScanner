import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../../../config";
export default function Demo() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [PublisherType, setPublisherType] = useState("");
  // useEffect(() => {
  //   const getBarCodeScannerPermissions = async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   };

  //   getBarCodeScannerPermissions();
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
  // useEffect(()=>{
  //   usersCollection();
  // },[1]);
  // const usersCollection = async () => {
  //   // setisLoading(true);
  //   const snapshot = await firebase.firestore().collection("products").get();
  //   const collection = [];
  //   snapshot.forEach((doc) => {
  //     collection.push(doc.data()); 
  //     // collection[doc.id] = doc.data();
  //   }); 
  //   console.log('flatlist item',JSON.stringify(collection));
  //   setPublisherType(collection);
  //   console.log('resultttt',PublisherType)
  //   // setisLoading(false);
  //   return JSON.stringify(collection);

  // };
  return (
    <View style={styles.container}>
      {/* <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
   <Text>hii</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});


