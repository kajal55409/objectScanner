import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Auth/Login";
import Splash from "../screens/Auth/Splash";
import Sign_up from "../screens/Auth/Sign_up";
import Forgot_Password from "../screens/Auth/Forgot_Password";
import Forgot_Otp from "../screens/Auth/Forgot_Otp";
import Home from "../screens/Home/Home";
import { firebase } from "../../config";
import Profile from "../screens/Home/Profile";
import ProductDetails from "../screens/Product/ProductDetails";
import ProductAdd from "../screens/Product/ProductAdd";
const Stack = createNativeStackNavigator();
const Route = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (initializing) return null;
  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Sign_up" component={Sign_up} />
        <Stack.Screen name="Forgot_Password" component={Forgot_Password} />
        <Stack.Screen name="Forgot_Otp" component={Forgot_Otp} />

        {/* <Stack.Screen name='MessagePage' component={MessagePage}
        options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProductAdd" component={ProductAdd} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};
export default Route;
