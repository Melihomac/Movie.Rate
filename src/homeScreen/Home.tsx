import * as React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import useAuth from '../hooks/useAuth';
import {signOut} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import {db} from '../../FirebaseConfig';
import {ref, onValue} from 'firebase/database';
import {FIREBASE_APP} from '../../FirebaseConfig';
import {useState, useEffect} from 'react';

const Home = () => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH);
  };
  useEffect(() => {
    const starCountRef = ref(db, 'users/');
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();
      setData(data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button onPress={handleLogout} title="Logout"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default Home;
