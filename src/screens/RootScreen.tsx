import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from 'expo-vector-icons';
import React from "react";
import Home from '../components/Home';
import MatchesScreen from './MatchesScreen';
import MessageScreen from './MessagesScreen';
import OwnedNFTsScreen from './OwnedNFTsScreen';
import ProfileScreen from './ProfileScreen';
// import { urlFor } from '../src/lib/client.js'


// type HomeStackParametersList = {
//   client: undefined;
//   data: undefined;
//   products: [];
// };

// interface Props {
//   navigation: StackNavigationProp<HomeStackParametersList>;
// }

const Tab = createBottomTabNavigator();

export const RootScreen = () => {
  // const navigate = Props.navigation.navigate
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "md-home";
          }
          else if (route.name === "Matches") {
            iconName = "md-heart";
          }

          else if (route.name === "My NFTs") {
            iconName = "md-briefcase";
          }

          else if (route.name === "Profile") {
            iconName = "md-person";
          }

          else if (route.name === "Messages") {
            iconName = "md-mail";
          }

          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="My NFTs"
        component={OwnedNFTsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Messages"
        component={MessageScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default RootScreen;