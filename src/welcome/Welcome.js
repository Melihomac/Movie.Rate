import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../LoadingScreen/Loading';

const Slides = [
  {
    key: 's1',
    text: 'MovieRate offers you a real-time movie experience. ',
    title: 'Welcome to the MovieRate',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png',
    },
    backgroundColor: '#A20E0E',
  },
  {
    key: 's2',
    title: 'Welcome to the MovieRate',
    text: 'You can criticize and also comment on movies.',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png',
    },
    backgroundColor: '#20d2bb',
  },
  {
    key: 's3',
    title: 'Welcome to the MovieRate',
    text: 'You can create a list about your favorite movies.',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
    },
    backgroundColor: '#3395ff',
  },
  {
    key: 's4',
    title: 'Welcome to the MovieRate',
    text: 'MovieRate gives you all this for free.',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_best_deals.png',
    },
    backgroundColor: '#A20E0E',
  },
];

function Welcome({navigation}) {
  const [loading, setLoading] = useState(true);
  const [showRealApp, setShowRealApp] = useState(false);

  const checkForFirstTimeLoaded = async () => {
    const result = await AsyncStorage.getItem('showRealApp');
    if (result === null) {
      setShowRealApp(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkForFirstTimeLoaded();
  }, []);

  const onDone = () => {
    setShowRealApp(false);
    AsyncStorage.setItem('showRealApp', 'no');
  };

  const onSkip = () => {
    setShowRealApp(false);
    AsyncStorage.setItem('showRealApp', 'no');
  };

  if (loading) {
    return null;
  }

  const RenderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Image style={styles.introImageStyle} source={item.image} />
        <Text style={styles.introTextStyle}>{item.text}</Text>
        <TouchableOpacity>
          <Text style={styles.SignMessageTextStyle}>Already a member?</Text>
          <Text
            style={styles.SignTextStyle}
            onPress={() => navigation.push('SignIn')}>
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (showRealApp) {
    return (
      <AppIntroSlider
        data={Slides}
        renderItem={RenderItem}
        onDone={onDone}
        showSkipButton={true}
        onSkip={onSkip}
      />
    );
  }
  if (!showRealApp) {
    return <Loading />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 30,
    fontWeight: 'bold',
  },
  SignMessageTextStyle: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  SignTextStyle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  showIntroSlider: {
    color: 'blue',
  },
});

export default Welcome;
