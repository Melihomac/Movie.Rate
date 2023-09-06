import React, { Component, useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Image
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from "../homeScreen/Home";

const Loading = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [showRealApp, setShowRealApp] = useState()

    const checkForFirstTimeLoaded = async () => {
        const result = await AsyncStorage.getItem('showRealApp1');
        if (result === null) setShowRealApp(true);
        setLoading(false);
    };

    state = {
        fadeValue: new Animated.Value(0)
    };

    _start = () => {
        Animated.timing(this.state.fadeValue, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true
        }).start();
    };

    useEffect(() => {
        checkForFirstTimeLoaded();
    }, [])


    const navigationRouter = () => {
        setShowRealApp(false)
        AsyncStorage.setItem('showRealApp1', 'no');
    }

    if (loading) return null;

    console.log(showRealApp)

    if (showRealApp) {
        this._start()
        return (
            <View style={styles.container}>
                <Animated.View
                    style={{
                        opacity: this.state.fadeValue,
                        height: 250,
                        width: 130,
                        margin: 5,
                        borderRadius: 12,
                        backgroundColor: "white",
                        justifyContent: "center"
                    }}
                >
                    <TouchableOpacity onPress={() => navigationRouter()}>
                        <Image source={require('../../assets/img/Logo.png')} style={styles.image} />
                        <Text style={styles.text}>Click to continue...</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
    if (!showRealApp)
        return (
            <Home />
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center"
    },
    item: {},
    btn: {
        backgroundColor: "#480032",
        width: 100,
        height: 40,
        padding: 3,
        justifyContent: "center",
        borderRadius: 6
    },
    text: {
        marginTop: 30,
        fontSize: 15,
        color: "#A20E0E",
        fontWeight: "bold",
        textAlign: "center",
    },
    item1: {
        backgroundColor: "red",
        padding: 20,
        width: 100,
        margin: 10
    },

    textBtn: {
        color: "#f4f4f4",
        fontWeight: "bold",
        textAlign: "center"
    }
});

export default Loading