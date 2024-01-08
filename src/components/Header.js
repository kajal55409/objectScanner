import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

const Header = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.maintoolview}>
      <TouchableOpacity
        style={styles.mainbackBtn}
        onPress={() =>
          props.onPress
            ? navigation.navigate(props.onPress)
            : navigation.goBack()
        }
      >
        <Entypo name={"chevron-small-left"} size={40} color={"black"} />
      </TouchableOpacity>

      <Text style={styles.maintooltxt}>{props.headername}</Text>
      {/* <View style={styles.maintoolblankview} /> */}
    </View>

    // <View style={styles.headerStyle}>
    //   <TouchableOpacity
    //     onPress={() =>
    //       props.onPress
    //         ? navigation.navigate(props.onPress)
    //         : navigation.goBack()
    //     }
    //   >
    //     <Entypo name={"chevron-small-left"} size={40} color={"white"} />
    //   </TouchableOpacity>

    //   <Text style={styles.maintooltxt}>{props.headername}</Text>
    // </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  maintoolview: {
    width: "100%",
    height: Platform.OS === "android" ? 70 : 55,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    backgroundColor: "white",
    borderBottomWidth: 2,
    borderBottomColor: "#E7E7E7",
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  maintooltxt: {
    width: "70%",
    fontSize: 16,
    color: "black",
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
  },
  // maintoolview: {
  //   width: "100%",
  //   height: 55,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   shadowColor: "black",
  //   shadowOpacity: 0.15,
  //   shadowOffset: { width: 0, height: 10 },
  //   shadowRadius: 10,
  //   elevation: 3,
  //   backgroundColor: "white",
  // },
  maintoolblankview: {
    width: "15%",
    height: 50,
  },
  mainbackBtn: {
    width: "15%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  headerStyle: {
    height: 80,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: "black",
    elevation: 25,
  },
});
