import * as React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import 'react-native-get-random-values';
import database from '@react-native-firebase/database';

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorName, setErrorName] = useState<string | null>(null);
  const auth = FIREBASE_AUTH;
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const signUp = async () => {
    // function createDB() {
    //   const {currentUser} = auth;
    //   set(ref(db, `users/${name}`), {
    //     uuid: uuidKey,
    //     name: name,
    //     email: email,
    //     //profile_picture: imageUrl,
    //   })
    //     .then(() => {
    //       console.log('data submitted');
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }
    // createDB();
    if (!validateEmail(email)) {
      setErrorEmail('Invalid e-mail address');
      setLoading(false);
      return;
    } else {
      setErrorEmail(null);
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    } else {
      setError(null);
    }
    if (password.length < 6) {
      setError('The password should be 6 characters at least');
      setLoading(false);
      return;
    } else {
      setError(null);
    }
    if (name === '') {
      setErrorName('Please enter a name');
      setLoading(false);
      return;
    } else {
      setErrorName(null);
    }
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      ).then(data => {
        console.log('User ID : ', data.user.uid);
        const newPostRef = database().ref('users').push();
        newPostRef
          .set({
            name: name,
            id: data.user.uid,
          })
          .then(() => console.log('Data set.'));
      });
      console.log(response);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../../assets/img/LogoYan.png')}
        style={styles.image}
      />
      <View>
        <Text style={styles.signinText}>Sign Up</Text>
        <Text style={styles.signinDetailText}>Please sign up to continue</Text>
      </View>
      <View>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={styles.nameInputStyle}
            onChangeText={text => setName(text)}
            value={name}
            keyboardType="default"
            autoCapitalize="none"
            placeholder="Full Name"></TextInput>
          {errorName && <Text style={styles.errorText}>{errorName}</Text>}
          <TextInput
            style={styles.emailInputStyle}
            onChangeText={text => setEmail(text)}
            value={email}
            keyboardType="default"
            autoCapitalize="none"
            placeholder="Email"></TextInput>
          {errorEmail && <Text style={styles.errorText}>{errorEmail}</Text>}
          <TextInput
            style={styles.passwordInputStyle}
            onChangeText={text => setPassword(text)}
            value={password}
            keyboardType="default"
            secureTextEntry={true}
            placeholder="Password"></TextInput>
          <TextInput
            style={styles.passwordInputStyle}
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
            keyboardType="default"
            secureTextEntry={true}
            placeholder="Confirm Password"></TextInput>
          {error && <Text style={styles.errorText}>{error}</Text>}
          {loading ? (
            <ActivityIndicator size="large" color="#000ff" />
          ) : (
            <>
              <TouchableOpacity style={styles.signinButton} onPress={signUp}>
                <Text style={styles.signUpTextStyle}>Sign Up &#10140;</Text>
              </TouchableOpacity>
            </>
          )}
        </KeyboardAvoidingView>
        <View style={styles.haveAccount}>
          <Text style={styles.signupText}>Already have an account ? </Text>
          <TouchableOpacity>
            <Text style={styles.signUp} onPress={navigation.goBack}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
  signUpTextStyle: {color: '#fff', textAlign: 'center'},
  signinDetailText: {
    fontSize: 15,
    marginLeft: 30,
    marginTop: 5,
    color: '#B4B4B4',
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
    color: 'black',
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
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
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
    marginBottom: 30,
  },
});

export default SignUp;
