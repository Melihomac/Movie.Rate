import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import {signOut} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import {useState, useEffect} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import useHookGenre from '../hooks/useHookGenre';
import useHookTrend from '../hooks/useHookTrend';
import useHookNewMovie from '../hooks/useHookNewMovie';
import useHookComingSoon from '../hooks/useHookComingSoon';
import useHookTopRated from '../hooks/useHookTopRated';

interface Item {
  id: string;
  name: string;
  title: string;
  poster_path: string;
}

const Home = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const onChangeSearch = (query: any) => setSearchQuery(query);
  const [selectedItem, setSelectedItem] = useState('All');
  const [refreshing, setRefreshing] = React.useState(false);
  const {dataGenre, isLoading, error} = useHookGenre();
  const {dataTrend, isLoadingTrend, errorTrend} = useHookTrend();
  const {dataNewMovie, isLoadingNewMovie, errorNewMovie} = useHookNewMovie();
  const {dataComing, isLoadingComing, errorComing} = useHookComingSoon();
  const {dataTopRated, isLoadingTopRated, errorTopRated} = useHookTopRated();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
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
            style={styles.sliderImageTrend}
            source={{
              uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderItem = ({item}: {item: Item}) => {
    return (
      <View>
        <TouchableOpacity onPress={handleCardPress}>
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
  const renderHeader = () => {
    return (
      <View>
        <TouchableOpacity>
          <Text
            style={{
              borderColor: '#B4B4B4',
              borderWidth: 1,
              borderRadius: 15,
              margin: 2.5,
              fontSize: 15,
              padding: 5,
              color: selectedItem === 'All' ? '#A20E0E' : '#242424',
            }}>
            All
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const handleCardPress = (item: any) => {
    navigation.navigate('Home');
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <SafeAreaProvider>
        <View>
          <FlatList
            ListHeaderComponent={renderHeader}
            data={dataGenre}
            stickyHeaderIndices={[0]}
            renderItem={renderItemTrend}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <Text style={styles.trendingFont}>Trending Movies</Text>
          <FlatList
            data={dataTrend}
            renderItem={renderItemImage}
            style={styles.newMovie}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <Text style={styles.newMovieFont}>New Movies</Text>
          <FlatList
            data={dataNewMovie}
            renderItem={renderItem}
            style={styles.newMovie}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <Text style={styles.newMovieFont}>Coming Soon</Text>
          <FlatList
            data={dataComing}
            renderItem={renderItem}
            style={styles.newMovie}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <Text style={styles.newMovieFont}>Top Rated</Text>
          <FlatList
            data={dataTopRated}
            renderItem={renderItem}
            style={styles.newMovie}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </SafeAreaProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
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
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 5,
    fontSize: 25,
    color: '#242424',
  },
  newMovieFont: {
    marginLeft: 15,
    fontSize: 20,
    color: '#242424',
  },
  newMovie: {
    marginTop: 5,
    marginBottom: 10,
  },
  sliderImageTrend: {
    height: 300,
    width: 165,
    borderRadius: 30,
    marginLeft: 15,
  },
  sliderImageNewMovie: {
    height: 150,
    width: 100,
    borderRadius: 30,
    marginLeft: 15,
  },
  newMovieNames: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 23,
    width: 90,
  },
});

export default Home;
