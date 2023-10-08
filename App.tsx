import * as React from 'react';
import Image, {View, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Welcome from './src/welcome/Welcome';
import HeaderBackButton from './src/HeaderBackButton/HeaderBackButton';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Loading from './src/LoadingScreen/Loading';
import Home from './src/homeScreen/Home';
import Profile from './src/ProfileScreen/Profile';
import SearchScreen from './src/SearchScreen/SearchScreen';
import List from './src/AddListScreen/List';
import useAuth from './src/hooks/useAuth';
import HomeIcon from './assets/icons/house-solid.svg';
import ProfileIcon from './assets/icons/user-solid.svg';
import SearchIcon from './assets/icons/searchIcon.svg';
import DiscoverIcon from './assets/icons/earth-europe-solid.svg';
import ListIcon from './assets/icons/circle-plus-solid.svg';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DiscoverScreen from './src/DiscoverScreen/DiscoverScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function TabsNavigator() {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            padding: 10,
          },
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: 'MovieRate',
            headerTitleStyle: {
              color: '#A20E0E',
            },
            tabBarIcon: () => <HomeIcon name="ios-home" />,
            title: '',
          }}
        />
        <Tab.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            title: '',
            headerShown: false,
            tabBarIcon: () => <SearchIcon name="ios-search" />,
          }}
        />
        <Tab.Screen
          name="List"
          component={List}
          options={{
            title: '',
            headerShown: false,
            tabBarIcon: () => <ListIcon name="ios-discover" />,
          }}
        />
        <Tab.Screen
          name="DiscoverScreen"
          component={DiscoverScreen}
          options={{
            title: '',
            headerShown: false,
            tabBarIcon: () => <DiscoverIcon name="ios-discover" />,
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
    </SafeAreaProvider>
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

const styles = StyleSheet.create({});
