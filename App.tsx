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
import Profile from './src/ProfileScreen/Profile';
import useAuth from './src/hooks/useAuth';
import HomeIcon from './assets/icons/house-solid.svg';
import ProfileIcon from './assets/icons/user-solid.svg';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function TabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: () => <HomeIcon name="ios-home" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: () => <ProfileIcon name="ios-profile" />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const {user, loading} = useAuth();
  useEffect(() => {
    if (!loading) {
      SplashScreen.hide();
    }
  }, [loading]);
  if (loading) {
    return null;
  }
  console.log(user);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen
              name="tabsNavigator"
              component={TabsNavigator}
              options={{title: '', headerShown: false}}
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
