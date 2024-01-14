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
  ActivityIndicator,
  Button
} from "react-native";
import React, { useState, useEffect,useRef  } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
// import storage from '@react-native-firebase/storage'
// import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import SvgUri from 'react-native-svg-uri';
import { onValue, push, update, remove } from "firebase/database";
const ProductAdd =  ({ route }) => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [ProductUrl, setProductUrl] = useState("");
  const [qRCode, setqRCode] = useState("");
  const [Category, setCategory] = useState("");
  const [ProductItem, setProductItem] = useState([]);
  const [ModalPopup, setModalPopup] = useState(false);
  const [image, setimage] = useState("");
  const [Logoimage, setLogoimage] = useState("");
  const [mainImgArr, setmainImgArr] = useState([]);
  const [LogoImgArr, setLogoImgArr] = useState([]);
  const [imglist, setImglist] = useState([]);
  const [Errortext, setErrortext] = useState();
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
  const Type = route.params.type;
  const EditProductDetails = route.params.editInfo;

  // console.log("Edit info", EditProductDetails.id);
  useEffect(() => {
    if (Type == "edit") {
      setCategory(EditProductDetails.category);
      setTitle(EditProductDetails.title);
      setProductUrl(EditProductDetails.productUrl);
      setqRCode(EditProductDetails.qrCode);
      setDescription(EditProductDetails.description);
      setPrice(EditProductDetails.price);
      setImglist(EditProductDetails.image);
      // mainImgArr(EditProductDetails.image);
      setLogoImgArr(EditProductDetails.logo);
    }
  }, [1]);
  const qrCodeRef = useRef(null);
  const toggleModal = () => {
    setModalPopup(!ModalPopup);
  };
  const deleteImage = (item, index) => {
    var array = [...imglist]; // make a separate copy of the array
    array.splice(index, 1);
    setImglist(array);
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
      // console.log("result img", result);
      // console.log("assetASSESTSs", result.assets[0].uri);
      const uri = result.assets[0].uri;
      uploadImage(uri);
    }
  };

  const uploadImage = async (uri) => {
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();
    // console.log('fetchResponse fetchResponse',fetchResponse,)
    // console.log('theBlob theBlob',theBlob)
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + filename);
    const uploadTask = uploadBytesResumable(storageRef, theBlob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setisLoading(true);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;

          case "storage/unknown":
            break;
        }
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);

          let addedArrImg = [...imglist];
          addedArrImg.push(downloadURL);
          setImglist(addedArrImg);
          setisLoading(false);

          // console.log("addedArrImg addedArrImg", addedArrImg);
        });
      }
    );
  };

  const LogoUploadImage = async (uri) => {
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();
    // console.log('fetchResponse fetchResponse',fetchResponse,)
    // console.log('theBlob theBlob',theBlob)
    const storage = getStorage();
    const storageRef = ref(storage, "Logo/" + filename);
    const uploadTask = uploadBytesResumable(storageRef, theBlob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setisLoading(true);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;

          case "storage/unknown":
            break;
        }
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);

          // let addedArrLogoImg = [...LogoImgArr];
          // addedArrLogoImg.push(downloadURL);
          setLogoimage(downloadURL);
          setisLoading(false);

          // console.log("addedArrImg addedArrImg", addedArrImg);
        });
      }
    );
  };
  // useEffect(() => {
  //   // Generate the QR code SVG
  //   const qrCodeSvg = (
  //     <QRCode value={Logoimage} size={200}    />
  //   );

  //   const svgXml = qrCodeSvg.toXML();
  //   const uri = `data:image/svg+xml;base64,${btoa(svgXml)}`;

  //   // Create a reference to the Firebase Storage location where you want to store the QR code image
  //   const storageRef = firebase.storage().ref().child('qrcodes/qr_code.png');

  //   // Fetch the image data and convert it to a Blob
  //   fetch(uri)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       // Upload the QR code image to Firebase Storage
  //       storageRef.put(blob).then((snapshot) => {
  //         console.log('QR code uploaded successfully');
  //       }).catch((error) => {
  //         console.error('Error uploading QR code:', error);
  //       });
  //     });
  // }, []);

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
      const uri = result.assets[0].uri;
      LogoUploadImage(uri);
    }
  };

  const QRCodeUploadImage = async () => {
    const qrCodeSvg = (
          <QRCode value={Logoimage} size={200}    />
        );
    const filename = Logoimage.substring(Logoimage.lastIndexOf("/") + 1);
    const fetchResponse = await fetch(Logoimage);
    const theBlob = await fetchResponse.blob();
    // console.log('fetchResponse fetchResponse',fetchResponse,)
    // console.log('theBlob theBlob',theBlob)
    const storage = getStorage();
    const storageRef = ref(storage, "QRCode/" + filename);
    const uploadTask = uploadBytesResumable(storageRef, theBlob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setisLoading(true);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;

          case "storage/unknown":
            break;
        }
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);

          // let addedArrLogoImg = [...LogoImgArr];
          // addedArrLogoImg.push(downloadURL);
          setqRCode(downloadURL);
          setisLoading(false);

          // console.log("addedArrImg addedArrImg", addedArrImg);
        });
      }
    );
  };
 

  const AddProducts = async () => {
    const user_token = await AsyncStorage.getItem("UID");
    // setisLoading(true);
    if (!Category.category) {
      alert("Please select the category");
      return;
    } else if (!Title) {
      alert("Please enter the title");
      return;
    }
    // if (!ProductUrl) {
    //   alert("Please select the product url");
    //   return;
    // }
    // if (!qRCode) {
    //   alert("Please select the qr code");
    //   return;
    // }
    else if (!Description) {
      alert("Please enter the description");
      return;
    } else if (!Price) {
      alert("Please enter the price");
      return;
    } else if (imglist.length == 0 ) {
      alert("Please select the image");
      return;
    } else if (!Logoimage) {
      alert("Please select the logo image");
      return;
    } else {
      if (route.params.type == "edit") {
        await firebase
          .firestore()
          .collection("products")
          .doc(route.params.editInfo.id)
          .update({
            category: Category,
            title: Title,
            productUrl: ProductUrl,
            qrCode: qRCode,
            description: Description,
            price: Price,
            image: imglist,
            logo: Logoimage,
            id: route.params.editInfo.id,
            userId: user_token,
          })
          .then(function () {
            // console.log("Document successfully updated!");
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });

        alert("Product Updated Successfully");
        navigation.navigate("Home");
      } else {
        setisLoading(true);
        console.log('helloo')
        const db = firebase.firestore().collection("products").doc();
        const ProductId = db.id;
        await firebase.firestore().collection("products").doc(ProductId).set({
          category: Category,
          title: Title,
          productUrl: ProductUrl,
          qrCode: qRCode,
          description: Description,
          price: Price,
          image: imglist,
          logo: Logoimage,
          id: ProductId,
          userId: user_token,
        });
        alert("Product Added Successfully");
        navigation.goBack();
        setisLoading(false);
      }
    }
  };
  return (
    <SafeAreaView style={CommonStyle.SafeareaViewCommanStyle}>
      <Header
        headername={Type == "edit" ? "Edit the product" : "Add the Product"}
      />

      <ScrollView>
        <View style={{ marginTop: 10, marginHorizontal: 20 }}>
          <Text style={styles.headingText}>Category</Text>
          <Pressable
            style={CommonStyle.InputView}
            onPress={() => toggleModal()}
          >
            <Text style={{ color: Type == "edit" ? "black" : "grey" }}>
              {Category.category == undefined // save the product
                ? Category == "" // edit the edit
                  ? "Select the category"
                  : Category
                : Category.category}
            </Text>
            <AntDesign name="caretdown" size={18} color="#B7B7B7" />
          </Pressable>

          <Text style={styles.headingText}>Title</Text>
          <View style={CommonStyle.InputView}>
            <TextInput
              style={{ width: "90%", height: 15, margin: "2%" }}
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
              textAlignVertical="top"
              placeholder="Write the URL here.."
              // placeholderTextColor="black"
              value={ProductUrl}
              onChangeText={(text) => {
                setProductUrl(text);
              }}
            />
          </View>

          {/* <Text style={styles.headingText}>QR Code</Text>
          <View style={CommonStyle.InputView}>
            <TextInput
              style={{ width: "90%", height: 15, margin: "2%" }}
              textAlignVertical="top"
              placeholder="Write the QR code here.."
              // placeholderTextColor="black"
              value={qRCode}
              onChangeText={(text) => {
                setqRCode(text);
              }}
            />
          </View> */}

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
              textAlignVertical="top"
              placeholder="Write the price here.."
              // placeholderTextColor="black"
              value={Price}
              onChangeText={(text) => {
                setPrice(text);
              }}
            />
          </View>

          {/* {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ width: 200, height: 200 }}
            />
          )} */}

          {imglist.length !== 0 ? (
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
                data={imglist}
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

          {imglist.length == 0 ? (
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

          {Logoimage && (
            <View style={{alignItems:'center',justifyContent:'center'}}>
            <Image
              source={{ uri: Logoimage }}
              style={{ width: 100, height: 100 ,}}
            />
               
            </View>
          
     
          )}

         {Logoimage && (
          <View style={{ marginVertical:10,flexDirection:'row' }}>
    <QRCode
      value={Logoimage}
      size={100} // Adjust the size of the QR code as needed
     
    />
    <Button title='Upload QR code'
     onPress={()=>QRCodeUploadImage()}

     />

  </View> 
  )}
          {!Logoimage ? (
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
        style={[
          CommonStyle.button,
          { marginVertical: 30, width: "90%", alignSelf: "center" },
        ]}
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
                        // console.log("item is ", item);
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
