import * as React from "react";
import { useEffect } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Button,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { NavigationContainer, useNavigation, } from "@react-navigation/native";
import 'react-native-gesture-handler';
import BackButton from '../../assets/img/BackButton.svg'

const HeaderBackButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={navigation.goBack} style={styles.container} >
            <BackButton width={30} height={30} />
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 30,
        marginTop: 30,
    },
});

export default HeaderBackButton