import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {GoogleGenerativeAI} from '@google/generative-ai';
import {firebase} from '../../FirebaseConfig';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';

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

const DiscoverScreen = () => {
  const [outputText, setOutputText] = useState('');
  const [movieNames, setMovieNames] = useState([]);
  const [movieNameList, setMovieNameList] = useState('');

  const apiKey = 'AIzaSyCdqvTfPTluwjTN60tIsIKkWbPccXzMdhE';
  const genAI = new GoogleGenerativeAI(apiKey);

  const sendRequest = async () => {
    try {
      console.log('Filmler ' + movieNames.join(', '));
      const prompt = `Give me a movie similar to these movies: ${movieNames.join(
        ', ',
      )}.`;
      const model = genAI.getGenerativeModel({model: 'gemini-pro'});
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      setOutputText(text);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docs = await readDataFromFirestore('movies');
        const names = docs.map(element => element?.name);
        setMovieNames(names);
        setMovieNameList(names.join(',\n'));
      } catch (error) {
        console.error('Veri getirme hatası:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <SafeAreaView style={styles.safeArea}>
          <View>
            <View>
              <Text style={styles.favMovieHeader}>Your Favourite Movies</Text>
              <Text style={styles.favMovieName}>{movieNameList}</Text>
            </View>
            <TouchableOpacity style={styles.buttonStyle} onPress={sendRequest}>
              <Text style={styles.buttonTextStyle}>Generate AI</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.textStyle}>{outputText}</Text>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeArea: {
    flex: 1,
  },
  buttonStyle: {
    width: '90%',
    borderColor: '#A20E0E',
    borderWidth: 2,
    padding: 5,
    marginLeft: 15,
    borderRadius: 15,
    zIndex: 3,
    marginTop: 15,
  },
  buttonTextStyle: {
    fontSize: 25,
    fontFamily: 'Arial',
    textAlign: 'center',
  },
  textStyle: {
    fontSize: 15,
    fontFamily: 'Arial',
    padding: 20,
    textAlign: 'left',
    lineHeight: 25,
  },
  favMovieHeader: {
    fontSize: 30,
    padding: 15,
    borderWidth: 2,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    textAlign: 'center',
    borderRadius: 5,
    borderColor: '#A20E0E',
  },
  favMovieName: {
    padding: 15,
    lineHeight: 25,
    fontSize: 15,
  },
});

export default DiscoverScreen;
