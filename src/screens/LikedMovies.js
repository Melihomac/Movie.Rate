import AsyncStorage from '@react-native-async-storage/async-storage';
import {database} from '../../FirebaseConfig';
import {resolve} from 'path';

export const likedMovies = async dataDetail => {
  try {
    const result = await AsyncStorage.getItem('likedMovie');
    console.log('result ' + result);

    await AsyncStorage.setItem('likedMovie', dataDetail?.original_title);

    let key;
    key = database().ref('/movies').push.key;
    console.log(key);
    database
      .ref('movies')
      .update(result)
      .then(snapshot => {
        resolve(snapshot);
      })
      .catch(err => {
        console.log(err);
      });
    return result, true;
  } catch (error) {
    console.error('Error saving liked movie:', error);
    return false;
  }
};
