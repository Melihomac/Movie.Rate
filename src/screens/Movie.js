import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  Image,
} from 'react-native-safe-area-context';

const Movie = ({route}) => {
  // Tıklanan filmin ID'sini `route.params` üzerinden alabilirsiniz.
  const {movieId} = route.params;
  // Burada tıklanan filmin detaylarını çekmek ve göstermek için gereken kodu yazabilirsiniz.
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <View>
          <Text>{movieId}</Text>
          <Image
            style={styles.sliderImageTrend}
            source={{
              uri: `https://image.tmdb.org/t/p/original${movieId}`,
            }}
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
  sliderImageTrend: {
    height: 300,
    width: 165,
    borderRadius: 30,
    marginLeft: 15,
  },
});

export default Movie;
