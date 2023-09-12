import React, {Component, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {onAuthStateChanged} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../FirebaseConfig';

export default function useAuth() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(FIREBASE_AUTH, user => {
      console.log('got a user: ', user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsub;
  }, []);
  return {user};
}
