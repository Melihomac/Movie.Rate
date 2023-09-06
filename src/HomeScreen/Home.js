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

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text onPress={() => navigation.push("Home")}> Hello</Text>
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