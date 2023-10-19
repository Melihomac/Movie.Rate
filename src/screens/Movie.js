import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import BackButton from '../../assets/img/BackButton.svg';
import {useNavigation} from '@react-navigation/native';
import useMovieDetail from '../hooks/useMovieDetail';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import HeartIcon from '../../assets/icons/heart-regular.svg';

const Movie = ({route}) => {
  const {id} = route.params;
  const {dataDetail, isLoading, error} = useMovieDetail(id);
  const HeaderBackButton = () => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
        <BackButton width={30} height={30} />
      </TouchableOpacity>
    );
  };
  const genres = dataDetail?.genres || [];
  const genreNames = genres.map(genre => genre.name);
  const genreText = genreNames.join(', ');
  return (
    <SafeAreaView
      style={styles.container}
      forceInset={{top: 'never', bottom: 'always'}}>
      <ScrollView style={styles.pageStyle}>
        <HeaderBackButton />
        <Image
          style={styles.sliderImageTrend}
          source={{
            uri: `https://image.tmdb.org/t/p/original${dataDetail?.poster_path}`,
          }}
        />
        <TouchableOpacity style={styles.heartIcon}>
          <HeartIcon
            width={30}
            height={30}
            style={{marginBottom: 10, marginTop: 10}}
          />
        </TouchableOpacity>
        <View style={styles.genreStyle}>
          <Text style={{marginBottom: 5}}>Category: {genreText}</Text>
          <Text style={{marginBottom: 5}}>
            Duration: {dataDetail?.runtime} minutes
          </Text>
          <Text style={{marginBottom: 5}}>
            Release Date: {dataDetail?.release_date}
          </Text>
        </View>
        <Text style={styles.summaryTextStyle}>Summary</Text>
        <View style={styles.summaryStyle}>
          <Text>{dataDetail?.overview}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pageStyle: {
    flexGrow: 1,
  },
  backButton: {
    marginLeft: 30,
    marginTop: 60,
    zIndex: 2,
    position: 'absolute',
  },
  heartIcon: {
    width: 'auto',
    backgroundColor: '#A20E0E',
    borderRadius: 15,
    alignItems: 'center',
    color: 'white',
    marginBottom: 5,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  sliderImageTrend: {
    height: '150%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  genreStyle: {
    marginTop: 10,
    fontSize: 20,
    borderRadius: 30,
    padding: 10,
    fontFamily: 'Yi Baiti',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
  },
  summaryTextStyle: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'Yi Baiti',
    marginLeft: 20,
    marginRight: 10,
    fontWeight: 'bold',
    color: '#A20E0E',
  },
  summaryStyle: {
    marginTop: 10,
    fontSize: 20,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    padding: 10,
    fontFamily: 'Yi Baiti',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
  },
});

export default Movie;
