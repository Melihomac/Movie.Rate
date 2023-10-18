import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Card} from 'react-native-paper';
import {TextInput} from 'react-native-gesture-handler';
import search from '../../assets/icons/search.png';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import useHookSearch from '../hooks/useHookSearch';
import {useState, useEffect} from 'react';
import Loading from '../Loading/Loading';

interface Item {
  id: string;
  name: string;
  title: string;
  poster_path: string;
  dataSearch: string;
  release_date: string;
  overview: string;
}

const SearchScreen = ({navigation}: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchNow, setSearchNow] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    setLoading(true);
    useHookSearch(searchTerm, movies).then(data => {
      setMovies(data);
      setLoading(false);
    });
  }, [searchNow]);

  const handleMovie = (id: string) => {
    navigation.navigate('Movie', {id});
  };

  const renderItem = ({item}: {item: Item}) => {
    return (
      <View>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => handleMovie(item?.id)}>
          <Image
            style={styles.sliderImageNewMovie}
            source={{
              uri: `https://image.tmdb.org/t/p/w300/${item.poster_path}`,
            }}
          />
          <View style={{width: '100%'}}>
            <Text style={styles.newMovieNames} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.releaseDate} numberOfLines={1}>
              Release Date: {item.release_date}
            </Text>
            <Text style={styles.overviewStyle} numberOfLines={7}>
              {item.overview}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return loading ? (
    <Loading />
  ) : (
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
                placeholderTextColor="black"
                autoFocus={false}
                autoComplete="off"
              />
            </View>
            <TouchableOpacity
              style={styles.searchBtn}
              onPress={() => {
                console.log('pressed');
                setSearchNow(!searchNow);
              }}>
              <Image
                source={search}
                resizeMode="contain"
                width={30}
                height={30}
                style={styles.searchBtnImage}
              />
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={movies}
              renderItem={renderItem}
              style={{marginBottom: 165}}
            />
          </View>
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
    color: '#242424',
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
  sliderImageNewMovie: {
    height: 250,
    width: 150,
    borderRadius: 30,
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 0,
  },
  newMovieNames: {
    fontSize: 20,
    marginHorizontal: '5%',
    marginVertical: '5%',
    width: '50%',
  },
  releaseDate: {
    fontSize: 15,
    width: '50%',
    marginHorizontal: '5%',
  },
  overviewStyle: {
    fontSize: 15,
    width: '50%',
    marginHorizontal: '5%',
    marginTop: 15,
  },
});

export default SearchScreen;
