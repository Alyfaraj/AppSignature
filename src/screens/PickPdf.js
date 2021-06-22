import React from 'react';
import {View, Text, TouchableOpacity,PermissionsAndroid, StyleSheet, Image, Platform} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {useState} from 'react';
import Steper from './Steper';
import { useEffect } from 'react/cjs/react.development';

const PickPdf = ({navigation}) => {
  const [pdf, setPdf] = useState(null);

  const handelPickPdf = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
      setPdf(res);
      //   navigation.navigate('AddSignture', {pdfFile: res.uri});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };


  useEffect(()=>{
    requestStoragePermission()

  },[])

  const requestStoragePermission = async () => {
    try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: "Storage Permission",
             message: "requires Storage Permission",
             buttonNegative: "Cancel",
             buttonPositive: "OK",
          },
       );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          alert('gennn')
           return true;


       } else {
         return false;
       }
       } catch (err) {
          console.warn(err);
            return false;
       }
    };


  return (
    <View style={[styles.constiner]}>
      <Image
        style={{
          width: '25%',
          height: '25%',
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
        source={require('../assets/images/logo.png')}
      />
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          width: '80%',
          alignSelf: 'center',
          marginBottom: 20,
        }}>
        مرحباً بك في تطبيق عملاء شركة ربط لتصميم تطبيقات الجوال
      </Text>
      <TouchableOpacity
        onPress={handelPickPdf}
        activeOpacity={0.8}
        style={styles.pickContiner}>
        <Image
          style={{
            width: '25%',
            height: '25%',
            marginBottom: 10,
            resizeMode: 'contain',
          }}
          source={require('../assets/images/file.png')}
        />
        <Text>{pdf?.name}</Text>
      </TouchableOpacity>
      <Steper />
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          width: '80%',
          alignSelf: 'center',
          marginBottom: 5,
          opacity: 0.8,
        }}>
        قم بإضافه الملف المراد توقيعه من هاتفك
      </Text>
      <TouchableOpacity
      disabled={!pdf}
        onPress={() => navigation.navigate('AddSignture', {pdfFile: `file://${pdf.uri}`})}
        style={{
          width: '80%',
          height: '6%',
          backgroundColor: 'rgba(88, 183, 216, 1)',
          borderRadius: 30,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text style={{color: '#fff', fontSize: 18}}>التالي</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  constiner: {
    flex: 1,
    backgroundColor: 'rgb(247,250,249)',
  },
  pickContiner: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    width: '70%',
    height: '30%',
    alignSelf: 'center',
    //  marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PickPdf;
