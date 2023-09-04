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
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { NavigationContainer, useNavigation, } from "@react-navigation/native";
import 'react-native-gesture-handler';

const SignUp = () => {
    const navigation = useNavigation();
    const [fullName, onFullName] = React.useState('Full Name');
    const [emailText, onEmailText] = React.useState('Email');
    const [passwordText, onPasswordText] = React.useState('Password');
    const [confirmPassword, onConfirmPassword] = React.useState('Confirm Password');
    const [date, onDate] = React.useState('Date');
    return (
        <ScrollView style={styles.container}>
            <Image source={require('../../assets/img/LogoYan.png')} style={styles.image} />
            <View>
                <Text style={styles.signinText}>Sign Up</Text>
                <Text style={styles.signinDetailText}>Please sign up to continue</Text>
            </View>
            <View>
                <TextInput
                    style={styles.nameInputStyle}
                    onChangeText={fullName => onFullName(fullName)}
                    value={fullName}
                    keyboardType='default'
                ></TextInput>
                <TextInput
                    style={styles.emailInputStyle}
                    onChangeText={emailText => onEmailText(emailText)}
                    value={emailText}
                    keyboardType='default'
                ></TextInput>
                <TextInput
                    style={styles.passwordInputStyle}
                    onChangeText={passwordText => onPasswordText(passwordText)}
                    value={passwordText}
                    keyboardType='default'
                ></TextInput>
                <TextInput
                    style={styles.passwordInputStyle}
                    onChangeText={confirmPassword => onConfirmPassword(confirmPassword)}
                    value={confirmPassword}
                    keyboardType='default'
                ></TextInput>
                <TextInput
                    style={styles.passwordInputStyle}
                    onChangeText={date => onDate(date)}
                    value={date}
                    keyboardType='default'
                ></TextInput>
                <TouchableOpacity style={styles.signinButton}>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Sign Up  &#10140;</Text>
                </TouchableOpacity>
                <View style={styles.haveAccount}>
                    <Text style={styles.signupText}>Already have an account ? </Text>
                    <TouchableOpacity>
                        <Text
                            style={styles.signUp}
                            onPress={navigation.goBack}
                        >
                            Sign in
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        marginLeft: 230,
        height: 160,
    },
    signinText: {
        fontWeight: 'bold',
        fontSize: 30,
        marginLeft: 30,
        color: '#242424'
    },
    signinDetailText: {
        fontSize: 15,
        marginLeft: 30,
        marginTop: 5,
        color: "#B4B4B4"
    },
    nameInputStyle: {
        fontSize: 15,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        borderColor: '#d4d4d4',
        borderRadius: 10,
        borderWidth: 0.5,
        padding: 10,
        backgroundColor: '#fff',
        color: '#b4b4b4',
    },
    emailInputStyle: {
        fontSize: 15,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        borderColor: '#d4d4d4',
        borderRadius: 10,
        borderWidth: 0.5,
        padding: 10,
        backgroundColor: '#fff',
        color: '#b4b4b4',
    },
    passwordInputStyle: {
        fontSize: 15,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        borderColor: '#d4d4d4',
        borderRadius: 10,
        borderWidth: 0.5,
        padding: 10,
        backgroundColor: '#fff',
        color: '#b4b4b4',
    },
    signinButton: {
        fontSize: 15,
        marginLeft: 230,
        marginRight: 30,
        marginTop: 15,
        borderColor: '#d4d4d4',
        borderRadius: 20,
        padding: 20,
        backgroundColor: '#A20E0E',
        shadowOffset: { width: 2.5, height: 2.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
    haveAccount: {
        marginTop: 15,
        flexDirection: 'row',
    },
    signupText: {
        fontSize: 15,
        color: '#b4b4b4',
        textAlign: 'left',
        marginLeft: 67,
    },
    signUp: {
        fontSize: 16,
        color: '#A20E0E',
        textAlign: 'right',
        fontWeight: 'bold',
        marginRight: 90,
        marginBottom: 30,
    },
})

export default SignUp