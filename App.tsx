import * as React from 'react';
import {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Welcome from './src/welcome/Welcome';
import HeaderBackButton from './src/HeaderBackButton/HeaderBackButton';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Loading from './src/LoadingScreen/Loading';
import Home from './src/homeScreen/Home';
import {User, onAuthStateChanged} from 'firebase/auth';
import {FIREBASE_AUTH} from './FirebaseConfig';
import useAuth from './src/hooks/useAuth';

const Stack = createStackNavigator();

export default function App() {
  const {user} = useAuth();
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  console.log(user);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {user ? (
            <Stack.Screen
              name="Home"
              component={Home}
              options={{title: '', headerShown: false, gestureEnabled: false}}
            />
          ) : (
            <>
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                  title: '',
                  headerShadowVisible: false,
                  headerLeft: () => <HeaderBackButton />,
                }}
              />
              <Stack.Screen
                name="Loading"
                component={Loading}
                options={{title: '', headerShadowVisible: false}}
              />
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                  title: '',
                  headerShadowVisible: false,
                  headerLeft: () => <HeaderBackButton />,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
