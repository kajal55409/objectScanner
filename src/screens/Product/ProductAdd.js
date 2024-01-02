import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import Header from "../../components/Header";
import * as ImagePicker from "expo-image-picker";
import {
  FontAwesome5,
  AntDesign,
  Feather,
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CommonStyle from "../../components/CommonStyle";
import { firebase } from "../../../config";
// import storage from '@react-native-firebase/storage'
import { storage } from "../../../config";

const ProductAdd = () => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [ProductUrl, setProductUrl] = useState("");
  const [QRCode, setQRCode] = useState("");
  const [Category, setCategory] = useState("");
  const [ProductItem, setProductItem] = useState([]);
  const [ModalPopup, setModalPopup] = useState(false);
  const [image, setimage] = useState("");
  const [Logoimage, setLogoimage] = useState("");
  const [mainImgArr, setmainImgArr] = useState([]);
  const [LogoImgArr, setLogoImgArr] = useState([]);

  const [selectedImage, setSelectedImage] = useState();
  const [categorylist, setcategorylist] = useState([
    {
      id: 1,
      category: "Cosmetics and body care",
    },
    {
      id: 2,
      category: "Electronics",
    },
    {
      id: 3,
      category: "Clothes",
    },
    {
      id: 4,
      category: "Toys",
    },
    {
      id: 5,
      category: "Books",
    },
    {
      id: 6,
      category: "Digital services",
    },
    {
      id: 7,
      category: "Furniture and decor",
    },
    {
      id: 8,
      category: "health and wellness",
    },
    {
      id: 9,
      category: "Household items",
    },
    {
      id: 10,
      category: "Media",
    },
    {
      id: 11,
      category: "Pet care",
    },
    {
      id: 12,
      category: "Office equipment",
    },
    {
      id: 13,
      category: "Food and beverage",
    },
  ]);
  const toggleModal = () => {
    setModalPopup(!ModalPopup);
  };
  const deleteImage = (item, index) => {
    var array = [...mainImgArr]; // make a separate copy of the array
    array.splice(index, 1);
    setmainImgArr(array);
  };
  const confirmAlert = (item, index) => {
    Alert.alert(
      "Remove Alert",
      "Do you want to remove",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel"),
          style: "cancel",
        },
        {
          text: "yes",
          onPress: () => deleteImage(item, index),
        },
      ],
      { cancelable: false }
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      console.log('result img',result)
      // console.log('assetASSESTSs',result.uri)
      console.log('assetASSESTSs',result.assets[0].uri)
      let addedArr = [...mainImgArr];
      addedArr.push(result.assets[0].uri);
      // setmainImgArr(addedArr);

      const filename = result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf("/") + 1);

      console.log("filename:", filename)

      const uploadUri = Platform.OS === "ios" ? result.assets[0].uri.replace("file://", "") : result.assets[0].uri;

      console.log("uploadUri:", uploadUri)

      const task = storage().ref(filename).putFile(uploadUri);

      console.log("task::", task)

      task.on("state_changed", (snapshot) => {

        // setTransferred(

          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000

        // );

      });

      try {

        await task;

      } catch (e) {

        console.error(e);

      }

      const url = await storage().ref(filename).getDownloadURL();

      console.log(url,"URRKKK");

      // setSelectedImage(url)
      // setmainImgArr(url)
    }



  };
  const deleteLogoImage = (item, index) => {
    var Logoarray = [...LogoImgArr]; // make a separate copy of the array
    Logoarray.splice(index, 1);
    setLogoImgArr(Logoarray);
  };
  const confirmLogoAlert = (item, index) => {
    Alert.alert(
      "Remove Alert",
      "Do you want to remove",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel"),
          style: "cancel",
        },
        {
          text: "yes",
          onPress: () => deleteLogoImage(item, index),
        },
      ],
      { cancelable: false }
    );
  };
  const pickLogoImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      let addedLogoArr = [...LogoImgArr];
      addedLogoArr.push(result.assets[0].uri);
      setLogoImgArr(addedLogoArr);
    }
  };

  const AddProducts = async () => {
    setisLoading(true);
    if (!Category.category) {
      alert("Please select the category");
      return;
    }
    if (!Title) {
      alert("Please enter the title");
      return;
    }
    if (!ProductUrl) {
      alert("Please select the product url");
      return;
    }
    if (!QRCode) {
      alert("Please select the qr code");
      return;
    }
    if (!Description) {
      alert("Please select the description");
      return;
    }
    if (!Price) {
      alert("Please select the price");
      return;
    }
    if (!mainImgArr) {
      alert("Please select the image");
      return;
    }
    if (!LogoImgArr) {
      alert("Please select the logo image");
      return;
    }
  
    const db = firebase .firestore().collection("products").doc();
    const ProductId = db.id;
    // console.log("Product Item", ProductId)
 
    try {
      await   firebase  
  .firestore()
  .collection("products")
  .doc(ProductId)
    .set({
      category: Category.category,
      title: Title,
      productUrl: ProductUrl,
      qrCode: QRCode,
      description: Description,
      price:Price,
      image: mainImgArr,
      logo: LogoImgArr,
      id:ProductId,
    });
    // console.log('product info',ProductItem)
    alert("Product Added Successfully");
    navigation.navigate("Home");
  } catch (error) {
    setisLoading(false);
    alert(error.message);
  }
  };

  return (
    <SafeAreaView style={CommonStyle.SafeareaViewCommanStyle}>
      <Header headername="Add the Product" />

      <ScrollView>
        <View style={{ marginTop: 10, marginHorizontal: 20 }}>
          <Text style={styles.headingText}>Category</Text>
          <Pressable
            style={CommonStyle.InputView}
            onPress={() => toggleModal()}
          >
            <Text style={{ color: "grey" }}>
              {Category == "" ? "Select the category" : Category.category}
            </Text>
            <AntDesign name="caretdown" size={18} color="#B7B7B7" />
          </Pressable>

          <Text style={styles.headingText}>Title</Text>
          <View style={CommonStyle.InputView}>
            <TextInput
              style={{ width: "90%", height: 15, margin: "2%" }}
              multiline={true}
              textAlignVertical="top"
              placeholder="Write the title here.."
              // placeholderTextColor="black"
              value={Title}
              onChangeText={(text) => {
                setTitle(text);
              }}
            />
          </View>

          <Text style={styles.headingText}>Add the URL</Text>
          <View style={CommonStyle.InputView}>
            <TextInput
              style={{ width: "90%", height: 15, margin: "2%" }}
              multiline={true}
              textAlignVertical="top"
              placeholder="Write the URL here.."
              // placeholderTextColor="black"
              value={ProductUrl}
              onChangeText={(text) => {
                setProductUrl(text);
              }}
            />
          </View>

          <Text style={styles.headingText}>QR Code</Text>
          <View style={CommonStyle.InputView}>
            <TextInput
              style={{ width: "90%", height: 15, margin: "2%" }}
              multiline={true}
              textAlignVertical="top"
              placeholder="Write the QR code here.."
              // placeholderTextColor="black"
              value={QRCode}
              onChangeText={(text) => {
                setQRCode(text);
              }}
            />
          </View>

          <Text style={styles.headingText}>Description</Text>
          <View style={CommonStyle.TxtInputView}>
            <TextInput
              style={{
                width: "90%",
                height: 150,
                margin: "3%",
              }}
              //   placeholderTextColor="black"
              multiline={true}
              textAlignVertical="top"
              placeholder="Write the description here .."
              value={Description}
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
          </View>
          <Text style={styles.headingText}>Price</Text>
          <View style={CommonStyle.InputView}>
            <TextInput
              style={{ width: "90%", height: 15, margin: "2%" }}
              multiline={true}
              textAlignVertical="top"
              placeholder="Write the price here.."
              // placeholderTextColor="black"
              value={Price}
              onChangeText={(text) => {
                setPrice(text);
              }}
            />
          </View>

          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}

          {mainImgArr.length !== 0 ? (
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 10,
                marginTop: 20,
                // backgroundColor: "blue",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={CommonStyle.Container}
                onPress={() => pickImage()}
              >
                <Image
                  source={require("../../Assets/camera.png")}
                  style={{ width: 30, height: 26 }}
                />
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: "#DDDDDD",
                    marginTop: 5,
                  }}
                >
                  {"Image"} +
                </Text>
              </TouchableOpacity>

              <FlatList
                data={mainImgArr}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => {
                  return (
                    <View style={CommonStyle.ListView}>
                      <View style={{ alignItems: "center" }}>
                        <Image
                          source={{
                            uri: item.uri != undefined ? item.uri : item,
                          }}
                          style={{
                            height: 65,
                            width: 65,
                            borderRadius: 10,
                            marginHorizontal: 8,
                          }}
                          resizeMode={"contain"}
                        />
                      </View>

                      <TouchableOpacity
                        onPress={() => confirmAlert(item, index)}
                        activeOpacity={1}
                        style={{
                          height: 30,
                          width: 30,
                          top: 9,
                          right: -5,

                          alignItems: "center",
                          position: "absolute",
                        }}
                      >
                        <Image
                          source={require("../../Assets/crossicon.png")}
                          style={{
                            height: 18,
                            width: 18,
                            backgroundColor: "#fff",
                            borderRadius: 10,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          ) : null}

          {mainImgArr.length == 0 ? (
            <View style={{ marginTop: "5%" }}>
              <Pressable
                style={[
                  CommonStyle.button,
                  { marginVertical: 25, backgroundColor: "grey" },
                ]}
                onPress={() => pickImage()}
              >
                <Text style={CommonStyle.buttonText}>Upload the Images</Text>
              </Pressable>
            </View>
          ) : null}

          {/* <Pressable
            style={[
              CommonStyle.button,
              { marginVertical: 2, backgroundColor: "grey" },
            ]}
          >
            <Text style={CommonStyle.buttonText}>Upload the logo</Text>
          </Pressable> */}
          {Logoimage && (
            <Image
              source={{ uri: Logoimage }}
              style={{ width: 200, height: 200 }}
            />
          )}

          {LogoImgArr.length !== 0 ? (
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 10,
                marginTop: 20,
                // backgroundColor: "blue",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={CommonStyle.Container}
                onPress={() => pickLogoImage()}
              >
                <Image
                  source={require("../../Assets/camera.png")}
                  style={{ width: 30, height: 26 }}
                />
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: "#DDDDDD",
                    marginTop: 5,
                  }}
                >
                  {"Logo"} +
                </Text>
              </TouchableOpacity>

              <FlatList
                data={LogoImgArr}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => {
                  return (
                    <View style={CommonStyle.ListView}>
                      <View style={{ alignItems: "center" }}>
                        <Image
                          source={{
                            uri: item.uri != undefined ? item.uri : item,
                          }}
                          style={{
                            height: 65,
                            width: 65,
                            borderRadius: 10,
                            marginHorizontal: 8,
                          }}
                          resizeMode={"contain"}
                        />
                      </View>

                      <TouchableOpacity
                        onPress={() => confirmLogoAlert(item, index)}
                        activeOpacity={1}
                        style={{
                          height: 30,
                          width: 30,
                          top: 9,
                          right: -5,

                          alignItems: "center",
                          position: "absolute",
                        }}
                      >
                        <Image
                          source={require("../../Assets/crossicon.png")}
                          style={{
                            height: 18,
                            width: 18,
                            backgroundColor: "#fff",
                            borderRadius: 10,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          ) : null}

          {LogoImgArr.length == 0 ? (
            <View style={{ marginTop: "1%" }}>
              <Pressable
                style={[CommonStyle.button, { backgroundColor: "grey" }]}
                onPress={() => pickLogoImage()}
              >
                <Text style={CommonStyle.buttonText}>Upload the Logo</Text>
              </Pressable>
            </View>
          ) : null}

         
        </View>
      </ScrollView>
      <Pressable
            style={[CommonStyle.button, { marginVertical: 30,width:'90%',alignSelf:'center' }]}
            onPress={() => AddProducts()}
          >
            <Text style={CommonStyle.buttonText}>Save the Product</Text>
          </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={ModalPopup}
        activeOpacity={0.3}
        onRequestClose={() => {
          setModalPopup(!ModalPopup);
        }}
        style={{
          width: "100%",
          height: "100%",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <View style={CommonStyle.backgroundView} />

        <View
          style={[
            CommonStyle.modalView,
            {
              height: "70%",
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ alignItems: "flex-start" }}>
              {/* {static_Content.static_Data.inquiry_selectinquiryModal_txt} */}
              Select the category list
            </Text>
            <TouchableOpacity
              style={{ alignItems: "flex-end" }}
              onPress={() => setModalPopup(!ModalPopup)}
            >
              <Entypo name="circle-with-cross" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              {categorylist.map((item, index) => {
                return (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        console.log("item is ", item);
                        // setcategorylist(item);
                        setCategory(item);
                        setModalPopup(!ModalPopup);
                      }}
                      style={[
                        CommonStyle.serachaddress_postal,
                        {
                          height: 50,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontSize: 18,
                          textAlign: "center",
                        }}
                      >
                        {item.category}
                      </Text>
                    </TouchableOpacity>
                  </>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* </View> */}
      </Modal>
    </SafeAreaView>
  );
};

export default ProductAdd;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 19,
    fontWeight: "500",
    color: "black",
    marginLeft: 3,
    marginTop: 15,
  },
});
