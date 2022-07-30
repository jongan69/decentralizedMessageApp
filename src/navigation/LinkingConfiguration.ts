/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList, AuthStackParamList } from '../../types';

const linking: LinkingOptions<RootStackParamList | AuthStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Auth: {
        screens: {
          OnBoarding: 'OnBoarding',
          Login: 'Login',
          Register: 'Register',
        }
      },
      Root: {
        screens: {
          Profile: 'Profile',
          Messages: 'Messages',
          Moments: 'Moments',
          Settings: 'Settings',
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
