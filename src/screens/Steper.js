import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Steper = ({step = 1}) => {
  return (
    <View
      style={{
        width: width * 0.85,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 20,
      }}>
      <View
        style={[
          styles.dot,
          {
            backgroundColor:
              step >= 1 ? 'rgba(88, 183, 216, 1)' : 'rgba(159, 159, 159, 1)',
          },
        ]}>
        <Text style={{color: '#fff'}}>1</Text>
      </View>
      <View
        style={{
          width: width * 0.15,
          borderWidth: 1,
          borderColor: 'rgba(151, 151, 151, 1)',
        }}
      />
      <View
        style={[
          styles.dot,
          {
            backgroundColor:
              step >= 2 ? 'rgba(88, 183, 216, 1)' : 'rgba(159, 159, 159, 1)',
          },
        ]}>
        <Text style={{color: '#fff'}}>2</Text>
      </View>
      <View
        style={{
          width: width * 0.15,
          borderWidth: 1,
          borderColor: 'rgba(151, 151, 151, 1)',
        }}
      />
      <View
        style={[
          styles.dot,
          {
            backgroundColor:
              step >= 3 ? 'rgba(88, 183, 216, 1)' : 'rgba(159, 159, 159, 1)',
          },
        ]}>
        <Text style={{color: '#fff'}}>3</Text>
      </View>
      <View
        style={{
          width: width * 0.15,
          borderWidth: 1,
          borderColor: 'rgba(151, 151, 151, 1)',
        }}
      />
      <View
        style={[
          styles.dot,
          {
            backgroundColor:
              step >= 4 ? 'rgba(88, 183, 216, 1)' : 'rgba(159, 159, 159, 1)',
          },
        ]}>
        <Text style={{color: '#fff'}}>4</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    backgroundColor: 'rgba(88, 183, 216, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Steper;
