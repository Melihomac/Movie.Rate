import * as React from "react";
import { useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Button,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Welcome from './screens/Welcome';
import A from "./screens/A";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import 'react-native-gesture-handler';
import { HeaderBackButton } from '@react-navigation/elements';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name="A" component={A} options={{
              title: '', headerLeft: () => (
                <BackButton />
              )
            }}></Stack.Screen>
          </Stack.Navigator >
        </NavigationContainer >
      </View >
    </>
  );
}

const BackButton = () => {
  const navigation = useNavigation()
  return (
    <HeaderBackButton
      onPress={() => navigation.goBack()}
    ></HeaderBackButton>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
