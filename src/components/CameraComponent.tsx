import { NFT_STORAGE_API_KEY } from '@env';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { AppContext } from '../context/AppContext';
import uploadProfileImage from '../lib/uploadProfilePicture';

const ipfsApiUrl = 'https://api.nft.storage/upload';
const WINDOW_HEIGHT = Dimensions.get('window').height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

export default function CameraComponent() {
  const { currentUserWallet } = useContext(AppContext);
  const cameraRef = useRef();
  const navigation = useNavigation();
  const [image, setImage] = useState();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.front);
  // const [isCameraReady, setIsCameraReady] = useState(false);
  // const [isPreview, setIsPreview] = useState(false);


  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    const localUri = result.uri.replace("file:///", "file:/");
    setImage(localUri);
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      if (blob) {
        uploadProfileImage(blob, currentUserWallet)
        navigation.navigate('Profile')
        Alert.alert('Updated your profile pic from camera roll! Image will update shortly')
      }
    } catch {
      Alert.alert('Something happened! try again <3')
    }
  }

  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.9 };
      const picture = await cameraRef.current.takePictureAsync(options);
      // const source = picture.base64;
      await cameraRef.current.pausePreview();
      // console.log('Picture: ', picture.uri.replace("file:///", "file:/"))
      const picuri = await fetch(picture.uri.replace("file:///", "file:/"));
      const blobimage = await picuri.blob();
      // const base64Img = `data:image/jpg;base64,${source}`;
      uploadProfileImage(blobimage, currentUserWallet)
      setIsPreview(true);
      // Post to IPFS for immutability
      fetch(ipfsApiUrl, {
        method: 'POST',
        body: picture,
        headers: {
          'Content-Type': 'image/*',
          'Authorization': `Bearer ${NFT_STORAGE_API_KEY}`,
        },
      })
        .then(async response => {
          const IPFS = await response.json();
          console.log('NFT STORAGE RESPONSE:', IPFS)
          console.log('IPFS URL:', `ipfs://${IPFS.value.cid}`)
          Alert.alert('Image IPFS CID: ', IPFS.value.cid);
          navigation.navigate('Profile')
          Alert.alert('Updated your profile pic from camera! Image will update shortly')
        })
        .catch(err => {
          Alert.alert('Error Uploading NFT');
          console.log(err);
        });
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const cancelPreview = async () => {
    await cameraRef?.current?.resumePreview();
    setIsPreview(false);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <>
      <Camera
        ref={cameraRef}
        style={[{ flex: 1 }]}
        type={type}
        useCamera2Api={true}
      >
        <View style={[tw`flex-row mt-180`, { marginBottom: 0, paddingHorizontal: '30%' }]}>
          <TouchableOpacity
            style={[tw`pr-5`]}
            // disabled={!isCameraReady}
            onPress={pickImage}
          >
            <MaterialIcons name='image-search' size={28} color='white' />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            // disabled={!isCameraReady}
            onPress={onSnap}
            style={[tw`relative`, {
              backgroundColor: '#5A45FF',
              height: CAPTURE_SIZE,
              width: CAPTURE_SIZE,
              borderRadius: Math.floor(CAPTURE_SIZE / 2),
              // marginBottom: 28,
              // padding: 30,
              // marginHorizontal: '10%'
            }]}
          />
          <TouchableOpacity
            style={[tw`pl-5`]}
            // disabled={!isCameraReady}
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}>
            <MaterialIcons name='flip-camera-ios' size={28} color='white' />
          </TouchableOpacity>
        </View>
      </Camera>
    </>
  );
}
