import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Button, Image, Text, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from 'styled-components';
import tw from 'twrnc';
import { AppContext } from "../context/AppContext";
import updateProfile from '../lib/updateProfile';

const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`

const Header = styled.Text`
    color: #000;
    font-size: 30px;
    margin-bottom: 30px;
    margin-top: 20%
`

const FormContainer = styled.View`
    padding: 8px
    justify-content: center;
    align-items: center;
`

export const ProfileScreen = () => {
  const { currentUserData, currentUserWallet } = useContext(AppContext)
  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      Name: '',
      Biography: '',
    }
  });

  const onSubmit = (data: { Name: any; Biography: any; }) => {
    console.log('Updating User Profile with: ', currentUserWallet, data);
    updateProfile(currentUserWallet, data.Name, data.Biography)
    Alert.alert('Updated your name and bio!')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChange = (arg: { nativeEvent: { text: any; }; }) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  console.log('errors', errors, 'Data from provider: ', currentUserData);

  return (
    <Container style={[tw`bg-gray-300`]} >
      <Header> Profile Screen </Header>
      <ScrollView>
        <FormContainer>
          {currentUserData
            ?
            <>
              <Image
                style={{ height: 100, width: 100, borderRadius: 20 }}
                source={{ uri: currentUserData[0]?.imageUrl }} />
              <Button title="Update Profile Picture" onPress={() => navigation.navigate('Camera')} />
            </>
            :
            <>
              <Text> You haven't set a Profile Picture! </Text>
              <Button title="Set Image" onPress={() => navigation.navigate('Camera')} />
            </>
          }
          <Text style={[tw`p-5`]}> Your Displayed Name </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[tw`bg-gray-400`, { width: '80%' }]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={currentUserData[0]?.name}
              />
            )}
            name={"Name"}
          />
          {errors.Name && <Text>This is required.</Text>}

          <Text style={[tw`p-5`]}> Your Biography</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 500,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[tw`bg-gray-400`, { width: '80%' }]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={currentUserData[0]?.userBio}
              />
            )}
            name="Biography"
          />
        </FormContainer>
        <Button title="Update" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </Container >
  );
}

export default ProfileScreen;