import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Share,
  Dimensions,
} from 'react-native';
import Steper from './Steper';

const Success = ({route}) => {
  const {filePath} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Image
        style={{
          width: '30%',
          height: '30%',
          marginVertical: 20,
          marginTop: Dimensions.get('screen').height * 0.1,
          resizeMode: 'contain',
        }}
        source={require('../assets/images/check.png')}
      />
      <Text
        style={{
          fontSize: 22,
          textAlign: 'center',
          width: '60%',
          alignSelf: 'center',
          opacity: 0.8,
          marginBottom: Dimensions.get('screen').height * 0.05,
        }}>
     تم التوقيع علي الملف بنجاح خالص تمنياتنا بالتوفيق والسداد
      </Text>
      <Steper step={4} />
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          width: '80%',
          alignSelf: 'center',
          opacity: 0.8,
          marginTop: Dimensions.get('screen').height * 0.1,
          marginBottom: Dimensions.get('screen').height * 0.05,
        }}>
        قم بتحميل الملف او مشاركته عبر الواتس اب
      </Text>
      <TouchableOpacity
        onPress={() => {
          Share.share({
            url: filePath,
          });
        }}
        style={{
          width: '80%',
          height: '6%',
          backgroundColor: 'rgba(88, 183, 216, 1)',
          borderRadius: 30,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Text style={{color: '#fff', fontSize: 18}}>استخدام الملف</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Success;
