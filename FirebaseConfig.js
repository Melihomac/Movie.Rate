// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getDatabase} from 'firebase/database';
import database from '@react-native-firebase/database';

export const firebaseConfig = {
  apiKey: 'AIzaSyCFQIJUicOOXF3P4NfuUyxxjU78uqTwa1E',
  authDomain: 'movierate-46fec.firebaseapp.com',
  projectId: 'movierate-46fec',
  storageBucket: 'movierate-46fec.appspot.com',
  messagingSenderId: '163652590070',
  appId: '1:163652590070:web:6e9d279a60f9e60f004fd7',
  measurementId: 'G-BCY78X6P9R',
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
export const db = getDatabase(FIREBASE_APP);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export {FIREBASE_APP, FIREBASE_AUTH, database};
//const analytics = getAnalytics(app);
