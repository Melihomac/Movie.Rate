import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import 'react-native-gesture-handler';
import SideButton from '../../assets/img/bars-solid.svg';

const SideBarButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.container}>
      <SideButton width={30} height={30} style={{color: 'white'}} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    marginTop: 5,
    color: 'white',
  },
});

export default SideBarButton;
