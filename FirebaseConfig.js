// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth, initializeAuth} from 'firebase/auth';
import {getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCFQIJUicOOXF3P4NfuUyxxjU78uqTwa1E',
  authDomain: 'movierate-46fec.firebaseapp.com',
  projectId: 'movierate-46fec',
  storageBucket: 'movierate-46fec.appspot.com',
  messagingSenderId: '163652590070',
  appId: '1:163652590070:web:6e9d279a60f9e60f004fd7',
  measurementId: 'G-BCY78X6P9R',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
//const analytics = getAnalytics(FIREBASE_APP);
