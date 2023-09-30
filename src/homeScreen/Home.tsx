import * as React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import useAuth from '../hooks/useAuth';
import {signOut} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import {db} from '../../FirebaseConfig';
import {ref, onValue} from 'firebase/database';
import {FIREBASE_APP} from '../../FirebaseConfig';
import {useState, useEffect} from 'react';
import {Searchbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const Home = () => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query: any) => setSearchQuery(query);
  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        {/* <Text>Home Screen</Text>
        <Button onPress={handleLogout} title="Logout"></Button> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBar: {
    backgroundColor: 'white',
    marginLeft: 5,
    marginTop: 5,
    marginRight: 5,
    shadowOffset: {width: 2.5, height: 2.5},
    shadowOpacity: 0.5,
    shadowRadius: 1.5,
  },
});

export default Home;
