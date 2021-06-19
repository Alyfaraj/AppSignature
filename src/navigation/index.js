/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AddSignture from '../screens/AddSignture';
import About from '../screens/About';
import PickPdf from '../screens/PickPdf';
import Success from '../screens/Success';
const MainStack = createStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name="PickPdf"
          component={PickPdf}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="AddSignture"
          component={AddSignture}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="About"
          component={About}
          options={{headerShown: false}}
        />
          <MainStack.Screen
          name="Success"
          component={Success}
          options={{headerShown: false}}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
