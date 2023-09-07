import * as React from "react";
import { useEffect } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Button,
    Text,
    TouchableOpacity,
} from 'react-native';

const Home = () => {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Home