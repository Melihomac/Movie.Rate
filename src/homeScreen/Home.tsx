import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import useAuth from '../hooks/useAuth';
import {signOut} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import {db} from '../../FirebaseConfig';
import {ref, onValue} from 'firebase/database';
import {FIREBASE_APP} from '../../FirebaseConfig';
import {useState, useEffect} from 'react';
import {Searchbar} from 'react-native-paper';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import useHookGenre from '../hooks/useHookGenre';
import useHookTrend from '../hooks/useHookTrend';

interface Item {
  id: string;
  name: string;
  title: string;
  poster_path: string;
}

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const onChangeSearch = (query: any) => setSearchQuery(query);
  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH);
  };
  const {dataGenre, isLoading, error} = useHookGenre();
  const {dataTrend, isLoadingTrend, errorTrend} = useHookTrend();
  const renderItemTrend = ({item}: {item: Item}) => (
    <View>
      <TouchableOpacity>
        <Text style={styles.genreList}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
  const renderItemImage = ({item}: {item: Item}) => {
    return (
      <View>
        <TouchableOpacity>
          <Image
            style={styles.sliderImage}
            source={{
              uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <ScrollView>
      <SafeAreaProvider style={styles.container}>
        <SafeAreaView>
          <View>
            <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.searchBar}
            />
            <FlatList
              data={dataGenre}
              renderItem={renderItemTrend}
              keyExtractor={item => item.id}
              style={styles.genreTotal}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <Text style={styles.trendingFont}>Trending Movies</Text>
            <FlatList
              data={dataTrend}
              renderItem={renderItemImage}
              style={styles.genreTotal}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            {/* <Text>Home Screen</Text>
        <Button onPress={handleLogout} title="Logout"></Button> */}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ScrollView>
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
  genreTotal: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  genreList: {
    backgroundColor: 'white',
    color: '#242424',
    borderColor: '#B4B4B4',
    borderWidth: 1,
    borderRadius: 15,
    margin: 2.5,
    fontSize: 15,
    padding: 5,
  },
  trendingFont: {
    marginLeft: 15,
    fontSize: 25,
    color: '#242424',
  },
  sliderImage: {
    height: 300,
    width: 175,
    borderRadius: 30,
    marginLeft: 15,
  },
});

export default Home;
