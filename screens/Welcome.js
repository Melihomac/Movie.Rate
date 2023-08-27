import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    Button,
    TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

const Slides = [
    {
        key: 's1',
        text: 'MovieRate offers you a real-time movie experience. ',
        title: 'Welcome to the MovieRate',
        image: {
            uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png',
        },
        backgroundColor: '#A20E0E',
    },
    {
        key: 's2',
        title: 'Welcome to the MovieRate',
        text: 'You can criticize and also comment on movies.',
        image: {
            uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png',
        },
        backgroundColor: '#20d2bb',
    },
    {
        key: 's3',
        title: 'Welcome to the MovieRate',
        text: 'You can create a list about your favorite movies.',
        image: {
            uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
        },
        backgroundColor: '#3395ff',
    },
    {
        key: 's4',
        title: 'Welcome to the MovieRate',
        text: 'MovieRate gives you all this for free.',
        image: {
            uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_best_deals.png',
        },
        backgroundColor: '#A20E0E',
    },
]

const Welcome = ({ navigation }) => {
    const [showRealApp, setShowRealApp] = useState(false);

    const onDone = () => {
        setShowRealApp(true);
    };

    const onSkip = () => {
        setShowRealApp(true);
    };

    const RenderItem = ({ item }) => {
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
                        onPress={() => navigation.navigate("A")}
                    >
                        Sign in
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <>
            {showRealApp ? (
                <SafeAreaView style={styles.container}>
                    <View style={styles.container}>
                        <Text style={styles.titleStyle}>
                            React Native App Intro Slider using AppIntroSlider
                        </Text>
                        <Text style={styles.paragraphStyle}>
                            This will be your screen when you click Skip from any slide or
                            Done button at last
                        </Text>
                        <TouchableOpacity onPress={() => setShowRealApp(false)}>
                            <Text style={styles.showIntroSlider}>Show Intro Slider again</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView >
            ) : (
                <AppIntroSlider
                    data={Slides}
                    renderItem={RenderItem}
                    onDone={onDone}
                    showSkipButton={true}
                    onSkip={onSkip}
                />
            )}
        </>
    );
};

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
        fontWeight: 'bold'
    },
    showIntroSlider: {
        color: 'blue',
    }
});

export default Welcome; 