import React, { Component, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginSVG from '../assets/images/misc/login.svg';
import AppleSVG from '../assets/images/misc/apple.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import CoinbaseSVG from '../assets/images/misc/coinbase.svg';
import { useWalletConnect } from "@walletconnect/react-native-dapp";

// import FacebookSVG from '../assets/images/misc/facebook.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { AppContext } from '../context/AppProvider';




const LoginScreen = ({ navigation }) => {
  const { auth, dispatch } = useContext(AppContext);
  const connector = useWalletConnect();


  // React.useEffect(() => {
  //   if (connector.connected) {
  //     setCurrentUserWallet(connector.accounts[0])
  //   }
  // }, [connector])


  // const killSession = React.useCallback(() => {
  //   navigation.navigate('Welcome');
  //   setCurrentUserWallet(null);
  //   return connector.killSession();
  // }, [connector]);

  const Login = async () => {
    await dispatch({ type: "LOGIN" })
    if (auth.authenticated) console.log(`Authentication Success`)
  }

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector])


return (
  <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
    <View style={{ paddingHorizontal: 25 }}>
      <View style={{ alignItems: 'center' }}>
        <LoginSVG
          height={300}
          width={300}
          style={{ transform: [{ rotate: '-5deg' }] }}
        />
      </View>

      <Text
        style={{
          fontFamily: 'Roboto-Medium',
          fontSize: 28,
          fontWeight: '500',
          color: '#333',
          marginBottom: 30,
        }}>
        Login
      </Text>

      {/* <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
        /> */}

      <InputField
        label={'Wallet Address'}
        icon={<Ionicons
          name="wallet"
          size={20}
          color="#666"
          style={{ marginRight: 5 }} />}
        inputType="wallet"
        fieldButtonLabel={"Wallet Connect"}
        fieldButtonFunction={connectWallet}
        keyboardType={undefined} />

      <CustomButton label={"Login"} onPress={() => { }} />

      <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
        Or, login with ...
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 30,
        }}>
        <TouchableOpacity
          onPress={() => { }}
          style={{
            borderColor: '#ddd',
            borderWidth: 2,
            borderRadius: 10,
            paddingHorizontal: 30,
            paddingVertical: 10,
          }}>
          <GoogleSVG height={24} width={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { }}
          style={{
            borderColor: '#ddd',
            borderWidth: 2,
            borderRadius: 10,
            paddingHorizontal: 30,
            paddingVertical: 10,
          }}>
          <AppleSVG height={24} width={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { }}
          style={{
            borderColor: '#ddd',
            borderWidth: 2,
            borderRadius: 10,
            paddingHorizontal: 30,
            paddingVertical: 10,
          }}>
          <CoinbaseSVG height={24} width={24} />
        </TouchableOpacity>
      </View>

      {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Register</Text>
          </TouchableOpacity>
        </View> */}
    </View>
  </SafeAreaView>
);
};

export default LoginScreen;
