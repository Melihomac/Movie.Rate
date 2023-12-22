import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {firebase} from '../../FirebaseConfig';

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

const List = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docs = await readDataFromFirestore('movies');
        setTodos(docs);
      } catch (error) {
        // Hata durumunda yapılacak işlemler
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={todo => todo.id}
        renderItem={({item}) => (
          <View>
            <Text>{item.id}</Text>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default List;
