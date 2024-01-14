import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Platform,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
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
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { firebase } from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProductDetails = (props) => {
  const navigation = useNavigation();
  const [PublisherType, setPublisherType] = useState("");
  const [imageSlider, setimageSlider] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const ProductItemDetails = props.route.params.productID;
  // console.log('producct image',ProductItemDetails.image)

  // c12268276

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      usersCollectionSignUp();
      imagArray();
      // ProductItemDetails()
      // setimageSlider(ProductItemDetails.image)
    });
    return unsubscribe;
  }, [navigation]);

  const usersCollectionSignUp = async () => {
    const user_token = await AsyncStorage.getItem("UID");
    setisLoading(true);
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
        setisLoading(false);
      });
  };

  const imagArray = () => {
    const arr = ProductItemDetails.image;
    const response = arr.map((item) => {
      return { img: item };
    });

    // console.log('response img',response)
    setimageSlider(response);
  };

  return (
    <SafeAreaView style={CommonStyle.SafeareaViewCommanStyle}>
      <Header headername="ProductDetails" />
      <ScrollView>
        {imageSlider.length > 0 ? (
          <View style={{ marginVertical: 20 }}>
            <ImageSlider
              data={imageSlider}
              // data={ProductItemDetails.image}
              defaultSource={require("../../Assets/splash.png")}
              autoPlay={true}
              localImg={false}
              showIndicator={true}
              indicatorContainerStyle={{
                top: 5,
              }}
              preview={false}
            />
          </View>
        ) : (
          <View style={{ marginVertical: 20 }}>
            <ImageSlider
              // data={imageSlider}
              // data={ProductItemDetails.image}
              defaultSource={require('../../Assets/splash.png')}
              autoPlay={true}
              localImg={true}
              showIndicator={true}
              indicatorContainerStyle={{
                top: 5,
              }}
              preview={false}
            />
          </View>
        )}

        <View style={{ padding: 20 }}>
          <Text style={[CommonStyle.headingText, { marginTop: 2 }]}>
            {ProductItemDetails.title}
          </Text>
          <Text style={CommonStyle.detailsTxt}>
            {ProductItemDetails.description}
          </Text>
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
            style={CommonStyle.button}
            onPress={() =>
              navigation.navigate("ProductAdd", {
                editInfo: ProductItemDetails,
                type: "edit",
              })
            }
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "600",
                color: "white",
              }}
            >
              Edit the Products
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

export default ProductDetails;

const styles = StyleSheet.create({
  image: {
    height: Platform.OS === "ios" ? 200 : 180,
    width: Platform.OS === "android" ? 410 : 415,
    marginHorizontal: 5,
    // borderRadius: Platform.OS == "android" ? 40 : 60,
    alignSelf: "center",
  },
});
