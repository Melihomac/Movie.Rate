import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import 'react-native-gesture-handler';
import BackButton from '../../assets/img/BackButton.svg';

const HeaderBackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={navigation.goBack} style={styles.container}>
      <BackButton width={30} height={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 30,
    marginTop: 30,
  },
});

export default HeaderBackButton;
