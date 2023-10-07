import React, {useEffect, useState} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <ActivityIndicator size="small" color="#0000ff" />
      <Text style={{color: '#A20E0E', alignSelf: 'center'}}>Loading...</Text>
    </View>
  );
};

export default Loading;
