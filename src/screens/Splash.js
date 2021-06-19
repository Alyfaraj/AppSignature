/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native';

const Splash = ({}) => {

  return (
  
      <View style={styles.contianer}>
        <StatusBar backgroundColor='rgb(36,20,64)' barStyle="light-content" />
        <Image
          source={require('../assets/images/logo.png')}
          style={[styles.logo, {resizeMode: 'contain'}]}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor:'rgb(36,20,64)' 
  },
  logo: {
    width:'50%',
    height:'50%',
    alignSelf: 'center',
    marginTop:'50%',
  },
  imageBack: {width: '100%', height: '100%'},
});

export default Splash;
