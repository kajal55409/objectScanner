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
import { SwiperFlatList } from "react-native-swiper-flatlist";
const ProductDetails = () => {
  const navigation = useNavigation();
  const Images = [
    require("../../Assets/mobile.png"),
    require("../../Assets/phone.png"),
  ];
  const { width } = Dimensions.get("window");
  const image = (index) => ({ image: Images[index % Images.length] });
  const items = Array.from(Array(Images.length)).map((_, index) =>
    image(index)
  );
  return (
    <SafeAreaView style={CommonStyle.SafeareaViewCommanStyle}>
      <Header headername="ProductDetails" />
      <ScrollView>
        <View style={{ marginVertical: 20 }}>
          <SwiperFlatList
            autoplay
            autoplayDelay={5}
            index={0}
            autoplayLoop
            showPagination
            data={items}
            renderItem={({ item }) => (
              <Image
                resizeMode="contain"
                style={styles.image}
                source={item.image}
                // defaultSource={require("../../Assets/camera.png")}
              />
            )}
          />
        </View>
        <View style={{ padding: 20 }}>
          <Text style={[CommonStyle.headingText, { marginTop: 2 }]}>
            Samsung galaxy
          </Text>
          <Text style={CommonStyle.detailsTxt}>
            Samsung Galaxy mobile devices use One UI, a user interface based on
            Google's Android operating system (OS). The latest Samsung Galaxy
            S22 Ultra smartphone offers a 108-megapixel camera and can shoot
            video in 8K ultra-high-definition resolution.
          </Text>
        </View>
      </ScrollView>
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
