import {collection, addDoc} from 'firebase/firestore';
import {database} from '../../FirebaseConfig';
import uuid from 'react-native-uuid';

export const likedMovies = async dataDetail => {
  try {
    const uuidNumber = uuid.v1();
    console.log(uuidNumber);
    const docRef = await addDoc(collection(database, 'movies'), {
      name: dataDetail?.original_title,
      id: uuidNumber,
      image: dataDetail?.poster_path,
      release_date: dataDetail?.release_date,
      overview: dataDetail?.overview,
    });
    console.log('Document written with ID: ', docRef.id);

    return true;
  } catch (error) {
    console.error('Error saving liked movie:', error);
    return false;
  }
};
