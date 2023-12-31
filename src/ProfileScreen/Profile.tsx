import * as React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {signOut} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../FirebaseConfig';

const Profile = () => {
  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH);
  };
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
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

export default Profile;
