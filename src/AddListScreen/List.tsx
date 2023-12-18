import * as React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {signOut} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import {likedMovies} from '../screens/LikedMovies';

const List = () => {
  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH);
  };
  return (
    <View style={styles.container}>
      <Text>{likedMovies?.result}</Text>
      <Text>List Screen</Text>
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

export default List;
