import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, Button } from '../components/Themed';
import { RootTabScreenProps } from '../../types';
import { AppContext } from '../context/AppProvider';



export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const { auth, dispatch } = useContext(AppContext);

  const Login = () => {
    dispatch({ type: "LOGIN"})
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button func={Login}>
      <Text style={styles.title}>Logged in {auth.userLoggedIn.toString()}</Text>
      </Button>
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
