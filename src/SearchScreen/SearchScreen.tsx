import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {signOut} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import {TextInput} from 'react-native-gesture-handler';
import SearchIcon from '../../assets/icons/search.svg';
import search from '../../assets/icons/search.png';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import useHookSearch from '../hooks/useHookSearch';
import {useState, useEffect} from 'react';

interface Item {
  id: string;
  name: string;
  title: string;
  poster_path: string;
}

const SearchScreen = () => {
  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const {dataSearch, isLoadingSearch, errorSearch} = useHookSearch(searchTerm);
  const renderItem = ({item}: {item: Item}) => {
    return (
      <View>
        <TouchableOpacity>
          <Image
            style={styles.sliderImageNewMovie}
            source={{
              uri: `https://image.tmdb.org/t/p/w300/${item.poster_path}`,
            }}
          />
          <Text style={styles.newMovieNames} numberOfLines={1}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <View>
          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                value={searchTerm}
                onChangeText={text => setSearchTerm(text)}
                placeholder="Search for Movies..."
                placeholderTextColor="white"
              />
            </View>
            <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
              <Image
                source={search}
                resizeMode="contain"
                width={30}
                height={30}
                style={styles.searchBtnImage}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={dataSearch}
            renderItem={renderItem}
            style={styles.newMovie}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchInput: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
    fontSize: 15,
    borderColor: '#A20E0E',
    borderWidth: 1,
    borderRadius: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  searchWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#B4B4B4',
    borderRadius: 15,
  },
  searchBtn: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A20E0E',
    borderRadius: 15,
    marginLeft: 5,
  },
  searchBtnImage: {
    width: '50%',
    height: '50%',
    tintColor: 'white',
  },
  newMovie: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 10,
  },
});

export default SearchScreen;
