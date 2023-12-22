import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  ScrollView,
  Image,
} from 'react-native';
import {firebase} from '../../FirebaseConfig';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const readDataFromFirestore = async collection => {
  try {
    const ref = firebase.firestore().collection(collection);
    const response = await ref.get();
    return response.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Firestore veri çekme hatası:', error);
    throw error;
  }
};

// Diğer import bildirimleri burada...

const List = () => {
  const [todos, setTodos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const docs = await readDataFromFirestore('movies');
      setTodos(docs);
    } catch (error) {
      console.error('Veri getirme hatası:', error);
    } finally {
      setRefreshing(false); // Yenileme işlemi tamamlandığında refreshing'i false yap
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <SafeAreaProvider style={styles.container}>
        <FlatList
          data={todos}
          keyExtractor={todo => todo.id}
          style={styles.movieNameStyle}
          renderItem={({item}) => (
            <View style={styles.movieContainer}>
              <Image
                style={styles.sliderImageNewMovie}
                source={{
                  uri: `https://image.tmdb.org/t/p/original${item.image}`,
                }}
              />
              <View style={styles.movieInfoStyle}>
                <Text style={styles.newMovieNames} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.releaseDate} numberOfLines={1}>
                  Release Date: {item.release_date}
                </Text>
                <Text style={styles.overviewStyle} numberOfLines={7}>
                  {item.overview}
                </Text>
              </View>
            </View>
          )}
        />
      </SafeAreaProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  movieNameStyle: {
    marginTop: 15,
    borderRadius: 15,
    padding: 5,
  },
  movieContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  sliderImageNewMovie: {
    height: 250,
    width: 150,
    borderRadius: 30,
    marginLeft: 15,
    marginTop: 15,
  },
  releaseDate: {
    fontSize: 15,
    width: '100%',
    marginHorizontal: '5%',
  },
  overviewStyle: {
    fontSize: 15,
    width: '85%',
    marginHorizontal: '5%',
    marginTop: 15,
  },
  newMovieNames: {
    fontSize: 20,
    marginHorizontal: '5%',
    marginVertical: '5%',
    width: '90%',
  },
  movieInfoStyle: {
    flex: 1,
  },
});

export default List;
