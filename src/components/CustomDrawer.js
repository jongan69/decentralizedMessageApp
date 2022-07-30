import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AppContext } from '../context/AppProvider';
import { useWalletConnect } from "@walletconnect/react-native-dapp";

const CustomDrawer = props => {
  const connector = useWalletConnect();
  const { auth, dispatch } = React.useContext(AppContext);

  const killSession = React.useCallback(() => {
    return connector.killSession();
}, [connector]);

  const Logout = () => {
    killSession();
    dispatch({ type: "LOGOUT" })
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#8200d6' }}>
        <ImageBackground
          source={require('../assets/images/menu-bg.jpeg')}
          style={{ padding: 20 }}>
          {auth.profileImageUrl === "No Profile Pic"
            ?
            <Image
              source={require('../assets/images/user-profile.jpg')}
              style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
            />
            :
            <Image
              source={{ uri: auth.profileImageUrl }}
              style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
            />
          }

          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            {auth.userName}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}>
              {auth.walletBalance}
            </Text>
            <FontAwesome5 name="coins" size={14} color="#fff" />
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 15 }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}>
              {/* {connector.connected ?
                connector.accounts[0]
                :
                `${auth?.walletAddress?.slice(0, 6)}...${auth?.walletAddress.slice(auth?.walletAddress?.length - 4, auth?.walletAddress?.length)}`
              } */}
              {auth?.walletAddress && `${auth?.walletAddress?.slice(0, 6)}...${auth?.walletAddress.slice(auth?.walletAddress?.length - 4, auth?.walletAddress?.length)}`}
            </Text>
            <FontAwesome5 name="wallet" size={14} color="#fff" />
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Logout()} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
