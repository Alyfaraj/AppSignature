import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import Splash from './src/screens/Splash';
import Nav from './src/navigation'

LogBox.ignoreAllLogs()


const App = () => {
  const [show, setShow] = useState(true);



  useEffect(() => {
    clearTimeout(timeout);
    let timeout = setTimeout(() => {
      setShow(false);
    }, 2500);
  }, []);




  return (
    <View style={{flex: 1}}>
      {show ? <Splash /> : <Nav />}
    </View>)
};





export default App;
