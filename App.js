import * as React from "react";
import { useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Welcome from "./src/welcome/Welcome";
import HeaderBackButton from "./src/headerbackbutton/HeaderBackButton";
import { NavigationContainer, useNavigation, } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';
import { SafeAreaProvider } from "react-native-safe-area-context";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerLeft: () => <HeaderBackButton /> }} initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignIn} options={{ title: '', headerShadowVisible: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ title: '', headerShadowVisible: false }} />
        </Stack.Navigator >
      </NavigationContainer >
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
