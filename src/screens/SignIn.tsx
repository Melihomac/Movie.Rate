import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Google from '../../assets/img/mdi_google.svg';
import Facebook from '../../assets/img/facebook.svg';
import {NavigationProp} from '@react-navigation/native';
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const SignIn = ({navigation}: RouterProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Image
          source={require('../../assets/img/LogoYan.png')}
          style={styles.image}
        />
        <View>
          <Text style={styles.signinText}>Sign In</Text>
          <Text style={styles.signinDetailText}>
            Please sign in to continue
          </Text>
        </View>
        <View>
          <TextInput
            style={styles.emailInputStyle}
            onChangeText={text => setEmail(text)}
            value={email}
            keyboardType="default"
            autoCapitalize="none"
            placeholder="Email"></TextInput>
          <TextInput
            style={styles.passwordInputStyle}
            onChangeText={text => setPassword(text)}
            value={password}
            keyboardType="default"
            secureTextEntry={true}
            placeholder="Password"></TextInput>
          {loading ? (
            <ActivityIndicator size="large" color="#000ff" />
          ) : (
            <>
              <TouchableOpacity style={styles.signinButton} onPress={signIn}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  Sign In &#10140;
                </Text>
              </TouchableOpacity>
            </>
          )}
          <View>
            <TouchableOpacity style={styles.signinGoogle}>
              <Google width={20} height={20} style={{marginLeft: 5}} />
              <Text
                style={{color: '#b4b4b4', textAlign: 'right', marginLeft: 145}}>
                Sign in with Google
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.signinFacebook}>
              <Facebook width={30} height={20} />
              <Text
                style={{color: '#b4b4b4', textAlign: 'right', marginLeft: 120}}>
                Sign in with Facebook
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.haveAccount}>
            <Text style={styles.signupText}>Don't have an account ? </Text>
            <TouchableOpacity>
              <Text
                style={styles.signUp}
                onPress={() => navigation.navigate('SignUp')}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

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
    color: '#242424',
  },
  signinDetailText: {
    fontSize: 15,
    marginLeft: 30,
    marginTop: 5,
    color: '#B4B4B4',
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
    color: 'black',
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
    color: 'black',
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
    shadowOffset: {width: 2.5, height: 2.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  signinGoogle: {
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
});

export default SignIn;
