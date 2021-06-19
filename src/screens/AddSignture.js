import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Share,
} from 'react-native';
import Steper from './Steper';

import Pdf from 'react-native-pdf';
const RNFS = require('react-native-fs');
import {PDFDocument} from 'pdf-lib';
import Signature from 'react-native-signature-canvas';
import {decode as atob, encode as btoa} from 'base-64';
const height = Dimensions.get('screen').height;

export default AddSignture = ({navigation, route}) => {
  const {pdfFile} = route.params;
  const sourceUrl =
    'http://www.africau.edu/images/default/sample.pdf?fbclid=IwAR0_sp7AS7w_6aNbHPV-tYuSd3XSo5vdE6neV-r3Q2Wm17GbWKPzIcoWNNc';

  const [fileDownloaded, setFileDownloaded] = useState(false);
  const [getSignaturePad, setSignaturePad] = useState(false);
  const [pdfEditMode, setPdfEditMode] = useState(false);
  const [signatureBase64, setSignatureBase64] = useState(null);
  const [signatureArrayBuffer, setSignatureArrayBuffer] = useState(null);
  const [pdfBase64, setPdfBase64] = useState(null);
  const [pdfArrayBuffer, setPdfArrayBuffer] = useState(null);
  const [newPdfSaved, setNewPdfSaved] = useState(false);
  const [newPdfPath, setNewPdfPath] = useState(null);
  const [pageWidth, setPageWidth] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [filePath, setFilePath] = useState(
    `${RNFS.DocumentDirectoryPath}/.pdf`,
  );

  useEffect(() => {
    downloadFile();
    if (signatureBase64) {
      setSignatureArrayBuffer(_base64ToArrayBuffer(signatureBase64));
    }
    if (newPdfSaved) {
      setFilePath(newPdfPath);
      setPdfArrayBuffer(_base64ToArrayBuffer(pdfBase64));
    }
    console.log('filePath', filePath);
  }, [signatureBase64, filePath, newPdfSaved]);

  const _base64ToArrayBuffer = (base64) => {
    const binary_string = atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const _uint8ToBase64 = (u8Arr) => {
    const CHUNK_SIZE = 0x8000; //arbitrary number
    let index = 0;
    const length = u8Arr.length;
    let result = '';
    let slice;
    while (index < length) {
      slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
      result += String.fromCharCode.apply(null, slice);
      index += CHUNK_SIZE;
    }
    return btoa(result);
  };

  const downloadFile = () => {
    // if (!fileDownloaded) {
    //   RNFS.downloadFile({
    //     fromUrl: pdfFile,
    //     toFile: filePath,
    //   }).promise.then((res) => {
    //     setFileDownloaded(true);
    //      readFile();
    //   });
    // }
    setFilePath(pdfFile);
    setFileDownloaded(true);
    readFile();
  };

  const readFile = () => {
    RNFS.readFile(
      `${RNFS.DocumentDirectoryPath}/react-native.pdf`,
      'base64',
    ).then((contents) => {
      setPdfBase64(contents);
      setPdfArrayBuffer(_base64ToArrayBuffer(contents));
    });
  };

  const getSignature = () => {
    setSignaturePad(true);
  };

  const handleSignature = (signature) => {
    setSignatureBase64(signature.replace('data:image/png;base64,', ''));
    setSignaturePad(false);
    setPdfEditMode(true);
  };

  const handleSingleTap = async (page, x, y) => {
    if (pdfEditMode) {
      setNewPdfSaved(false);
      setFilePath(null);
      setPdfEditMode(false);
      const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
      const pages = pdfDoc.getPages();
      const firstPage = pages[page - 1];

      // The meat
      const signatureImage = await pdfDoc.embedPng(signatureArrayBuffer);
      if (Platform.OS == 'ios') {
        firstPage.drawImage(signatureImage, {
          x: (pageWidth * (x - 12)) / Dimensions.get('window').width,
          y: pageHeight - (pageHeight * (y + 12)) / 540,
          width: 120,
          height: 120,
        });
      } else {
        firstPage.drawImage(signatureImage, {
          x: (firstPage.getWidth() * x) / pageWidth,
          y:
            firstPage.getHeight() -
            (firstPage.getHeight() * y) / pageHeight -
            25,
          width: 120,
          height: 120,
        });
      }
      // Play with these values as every project has different requirements

      const pdfBytes = await pdfDoc.save();
      const pdfBase64 = _uint8ToBase64(pdfBytes);
      const path = `${
        RNFS.DocumentDirectoryPath
      }/react-native_signed_${Date.now()}.pdf`;
      console.log('path', path);

      RNFS.writeFile(path, pdfBase64, 'base64')
        .then((success) => {
          setNewPdfPath(path);
          setNewPdfSaved(true);
          setPdfBase64(pdfBase64);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const saveFile = (name) => {
    // create a path you want to write to
    // var path = RNFS.DocumentDirectoryPath + '/' + 'gggg.txt';
    // // write the file
    // RNFS.writeFile(path,pdfBase64,'base64')
    //   .then((success) => {
    //     console.log('FILE WRITTEN!');
    //     success.path
    //   })
    //   .catch((err) => {
    //     console.log('SaveFile()', err.message);
    //   });

    Share.share({
      url: filePath,
    });
  };

  const style = `.m-signature-pad--footer
  .button {
    background-color: red;
    color: #FFF;
  }`;

  return (
    <View style={styles.container}>
      {getSignaturePad ? (
        <View
          style={{
            width: Dimensions.get('screen').width * 0.85,
            height: Dimensions.get('screen').height * 0.7,
          }}>
          <Signature
            webStyle={style}
            onOK={(sig) => handleSignature(sig)}
            onEmpty={() => console.log('___onEmpty')}
            descriptionText="Sign"
            clearText="مسح"
            confirmText="حفظ"
            minWidth={3}
            style={{width: '80%', height: '100%'}}
          />
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              width: '80%',
              alignSelf: 'center',
              marginVertical: 5,
              opacity: 0.8,
            }}>
            قم باضافه توقيعك عبر الرسم بإصبعك
          </Text>
          <Steper step={2} />
        </View>
      ) : (
        fileDownloaded && (
          <View>

            {filePath ? (
                <Pdf
                  onPageSingleTap={(page, x, y) => handleSingleTap(page, x, y)}
                  minScale={1.0}
                  maxScale={1.0}
                  scale={1.0}
                  spacing={0}
                  fitPolicy={0}
                  enablePaging={true}
                  source={{uri: filePath}}
                  usePDFKit={false}
                  onLoadComplete={(
                    numberOfPages,
                    filePath,
                    {width, height},
                  ) => {
                    setPageWidth(width);
                    setPageHeight(height);
                  }}
                  style={styles.pdf}
                />
            
            ) : (
              <View style={styles.button}>
                <Text style={styles.buttonText}>جاري اضافة التوقيع....</Text>
              </View>
            )}
            {pdfEditMode ? (
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    width: '80%',
                    alignSelf: 'center',
                    marginBottom: 5,
                    opacity: 0.8,
                  }}>
                  قم باضافه توقيعك في المكان المخصص بالاسفل علي اليسار
                </Text>
                <Steper step={3} />
              </View>
            ) : (
              filePath && (
                <View>
                  {newPdfSaved ? (
                    <View>
                      <Steper step={3} />

                      <TouchableOpacity
                        //  disabled={!pdf}
                        onPress={() =>
                          navigation.replace('Success', {filePath})
                        }
                        style={{
                          width: '80%',
                          //     height: '24%',
                          height: height * 0.06,
                          backgroundColor: 'rgba(88, 183, 216, 1)',
                          borderRadius: 30,
                          alignSelf: 'center',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 10,
                        }}>
                        <Text style={{color: '#fff', fontSize: 18}}>
                          التالي
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      <Steper step={2} />
                      <TouchableOpacity
                        //  disabled={!pdf}
                        onPress={getSignature}
                        style={{
                          width: '80%',
                          //     height: '24%',
                          height: height * 0.06,
                          backgroundColor: 'rgba(88, 183, 216, 1)',
                          borderRadius: 30,
                          alignSelf: 'center',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 10,
                        }}>
                        <Text style={{color: '#fff', fontSize: 18}}>
                          التالي
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )
            )}
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(247,250,249)',
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
  headerText: {
    color: '#508DBC',
    fontSize: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  pdf: {
    width: Dimensions.get('window').width,
    height: 540,
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#508DBC',
    padding: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#DAFFFF',
  },
  message: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF88C',
  },
  previewText: {
    color: '#FFF',
    fontSize: 14,
    height: 150,
    lineHeight: 200,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#69B2FF',
    width: 120,
    textAlign: 'center',
    marginTop: 10,
  },
});
