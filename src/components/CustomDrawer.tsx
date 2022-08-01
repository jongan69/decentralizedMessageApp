import React, { useCallback, useContext } from 'react';
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
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AppContext } from '../context/AppProvider';
import { RootState } from '../context/store';
import { useSelector, useDispatch } from 'react-redux';
import { setWallet } from '../context/store/wallet'

const CustomDrawer = props => {
  const { setCurrentWalletAddress } = useContext(AppContext)
  const connector = useWalletConnect();
  const dispatch = useDispatch();
  const wallet = useSelector((state: RootState) => state.wallet.walletAddress);

  const logout = () => {
    console.log("Logging out: ", wallet)
    if (connector.connected) {
      connector.killSession();
    }
    setCurrentWalletAddress("")
    dispatch(setWallet(""))
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#8200d6' }}>
        <ImageBackground
          source={require('../assets/images/menu-bg.jpeg')}
          style={{ padding: 20 }}>
          {wallet ?
            <Image
              source={require('../assets/images/user-profile.jpg')}
              style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
            />
            :
            null
          }
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            {wallet ? `${wallet?.slice(0, 6)}...${wallet.slice(wallet?.length - 4, wallet?.length)}` : 'No username'}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}>
              {wallet ? `${wallet?.slice(0, 6)}...${wallet.slice(wallet?.length - 4, wallet?.length)}` : 0}
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
              {wallet ? `${wallet?.slice(0, 6)}...${wallet.slice(wallet?.length - 4, wallet?.length)}` : 'No Wallet'}
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
        <TouchableOpacity
          onPress={() => { return logout() }}
          style={{ paddingVertical: 15 }}>
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
