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
import { TextInput } from 'react-native-gesture-handler';
import Google from '../../assets/img/mdi_google.svg'
import Facebook from '../../assets/img/facebook.svg'

const SignIn = ({ navigation }) => {
    const [emailText, onEmailText] = React.useState('Email');
    const [passwordText, onPasswordText] = React.useState('Password');
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/img/LogoYan.png')} style={styles.image} />
            <View>
                <Text style={styles.signinText}>Sign In</Text>
                <Text style={styles.signinDetailText}>Please sign in to continue</Text>
            </View>
            <View>
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
                <TouchableOpacity style={styles.signinButton}>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Sign In  &#10140;</Text>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity style={styles.signinGoogle}>
                        <Google width={20} height={20} />
                        <Text style={{ color: '#b4b4b4', textAlign: 'right', marginLeft: 150 }}>
                            Sign in with Google
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.signinFacebook}>
                        <Facebook width={30} height={20} />
                        <Text style={{ color: '#b4b4b4', textAlign: 'right', marginLeft: 125 }}>
                            Sign in with Facebook
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.haveAccount}>
                    <Text style={styles.signupText}>Don't have an account ? </Text>
                    <TouchableOpacity>
                        <Text
                            style={styles.signUp}
                            onPress={() => navigation.push("SignIn")}
                        >
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        marginLeft: 250,
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
    emailInputStyle: {
        fontSize: 15,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        borderColor: '#d4d4d4',
        borderRadius: 10,
        borderWidth: 0.5,
        padding: 15,
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
        padding: 15,
        backgroundColor: '#fff',
        color: '#b4b4b4',
    },
    signinButton: {
        fontSize: 15,
        marginLeft: 230,
        marginRight: 30,
        marginTop: 30,
        borderColor: '#d4d4d4',
        borderRadius: 20,
        padding: 20,
        backgroundColor: '#A20E0E',
        shadowOffset: { width: 2.5, height: 2.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
    signinGoogle: {
        fontSize: 15,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        borderColor: '#d4d4d4',
        borderRadius: 10,
        borderWidth: 0.5,
        padding: 15,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    signinFacebook: {
        fontSize: 15,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        borderColor: '#d4d4d4',
        borderRadius: 10,
        borderWidth: 0.5,
        padding: 15,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    haveAccount: {
        marginTop: 30,
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
    },
})

export default SignIn