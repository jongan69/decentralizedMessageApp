import React, { useContext, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginSVG from '../assets/images/misc/login.svg';
import AppleSVG from '../assets/images/misc/apple.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import CoinbaseSVG from '../assets/images/misc/coinbase.svg';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useDispatch, useSelector } from 'react-redux';
import { setWallet } from '../context/store/wallet'
// import FacebookSVG from '../assets/images/misc/facebook.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { AppContext } from '../context/AppProvider';


const LoginScreen = (props: { navigation: any }) => {
  const { currentWalletAddress, setCurrentWalletAddress } = useContext(AppContext);
  const [address, setAddress] = useState<string>("");
  const connector = useWalletConnect();
  const dispatch = useDispatch();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector])

  const disconnectWallet = React.useCallback(() => {
    setAddress("");
    connector.killSession();
    return address
  }, [connector])

  useEffect(() => {
    console.log('Wallet Entry is: ', address);
    if (connector.connected && address.length < 40) {
      setAddress(connector.accounts[0])
    }
  }, [connector, address])

  const Login = () => {
    console.log('Address was: ', address)
    if (address.length > 40) {
      console.log(`Wallet Entry ${address} was valid, call or create user in DB: `);
      dispatch(setWallet(address))
      setCurrentWalletAddress(address)
    } else {
      Alert.alert('Invalid Wallet Address', `${address} wasn't long enough`)
    }
  }

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
        <InputField
          label={'Wallet Address'}
          icon={<Ionicons
            name="wallet"
            size={20}
            color="#666"
            style={{ marginRight: 5 }} />}
          value={address}
          onChangeText={(value: string) => setAddress(value)}
          inputType="wallet"
          fieldButtonLabel={connector.connected ? "Disconnect" : "Wallet Connect"}
          fieldButtonFunction={connector.connected ? disconnectWallet : connectWallet}
          keyboardType={undefined} />

        <CustomButton label={"Login"} onPress={() => { Login() }} />
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => { }}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
