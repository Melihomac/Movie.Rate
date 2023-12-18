import {getDatabase, ref, onValue} from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const likedMovies = async dataDetail => {
  try {
    const result = await AsyncStorage.getItem('likedMovie');
    console.log('result ' + result);

    await AsyncStorage.setItem('likedMovie', dataDetail?.original_title);

    const dbRef = ref(getDatabase(), 'Film');
    onValue(dbRef, snapshot => {
      const data = snapshot.val();
      console.log('Veritabanındaki güncel veri: ', data);
    });

    return result, true;
  } catch (error) {
    console.error('Error saving liked movie:', error);
    return false;
  }
};
