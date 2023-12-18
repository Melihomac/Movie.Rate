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
import HeartIcon from '../../assets/icons/heart-solid.svg';
import {scaleHeight} from '../ScaleProps/ScaleProps';
import {likedMovies} from './LikedMovies';

const HeaderBackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
      <BackButton width={30} height={30} />
    </TouchableOpacity>
  );
};

const Movie = ({route}) => {
  const {id} = route.params;
  const {dataDetail} = useMovieDetail(id);
  const genres = dataDetail?.genres || [];
  const genreNames = genres.map(genre => genre.name);
  const genreText = genreNames.join(', ');
  return (
    <View style={styles.ViewStyle}>
      <ScrollView style={styles.ScroolViewStyle}>
        <HeaderBackButton />
        <Image
          style={styles.sliderImageTrend}
          source={{
            uri: `https://image.tmdb.org/t/p/original${dataDetail?.poster_path}`,
          }}
        />
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => likedMovies(dataDetail)}>
          <HeartIcon width={30} height={30} style={styles.HeartIconStyle} />
        </TouchableOpacity>
        <View style={styles.genreStyle}>
          <Text>Category: {genreText}</Text>
        </View>
        <View style={styles.genreStyle}>
          <Text>Duration: {dataDetail?.runtime} minutes</Text>
        </View>
        <View style={styles.genreStyle}>
          <Text>Release Date: {dataDetail?.release_date}</Text>
        </View>
        <Text style={styles.summaryTextStyle}>Summary</Text>
        <View style={styles.summaryStyle}>
          <Text>{dataDetail?.overview}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  ScroolViewStyle: {
    flexGrow: 1,
  },
  ViewStyle: {flex: 1},
  backButton: {
    marginLeft: 30,
    marginTop: 60,
    zIndex: 2,
    position: 'absolute',
  },
  HeartIconStyle: {
    marginBottom: 10,
    marginTop: 10,
  },
  sliderImageTrend: {
    height: scaleHeight(600),
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
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
  genreStyle: {
    marginTop: 10,
    fontSize: 20,
    borderRadius: 30,
    padding: 10,
    fontFamily: 'Yi Baiti',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
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
  submitButton: {
    bottom: 30,
    left: 0,
    marginLeft: 30,
    marginRight: 30,
    width: '100%',
    height: 50,
    borderRadius: 30,
    backgroundColor: '#A20E0E',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Movie;
