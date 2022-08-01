import React from "react";
import { SafeAreaView, KeyboardAvoidingView, Platform, Keyboard, View, Button } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import styled from 'styled-components';
import tw from 'twrnc';

const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const Header = styled.Text`
    color: #FFF;
    font-size: 30px;
    margin-bottom: 30px;
    margin-top: 20%
`

export const MessageScreen = () => {
  // const navigate = Props.navigation.navigate
  // const getData: () => Promise<void> = async () => {
  //   try {
  //     const query = '*[_type == "products"]';
  //     const data = await client.fetch(query);
  //     console.log(data)
  //     if (data) {
  //       setMessages(data);
  //       // Alert.alert('getMessages ran', messages.toString());
  //     } else {
  //       setMessages([])
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  // const [messages, setMessages] = useState([]);
  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <ScrollView style={[tw`bg-black`]}>
      <Container style={[tw`bg-black`]}>
        <Header> Messages Screen </Header>
        <SafeAreaView style={tw`flex-1`}>
          {/* <Header title={getMatchedUserInfo(matchDetails.users, user.uid)?.displayName} callEnabled /> */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={tw`'flex-1`}
            keyboardVeritcalOffset={10}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              {/* <FlatList
                data={messages}
                style={tw('pl-4')}
                inverted={-1}
                keyExtractor={item => item.id}
                renderItem={({ item: message }) =>
                  message.userId === user.uid ? (
                    <SenderMessage key={message.id} message={message} />
                  ) : (
                    <ReceiverMessage key={message.id} message={message} />
                  )}
              /> */}
            </TouchableWithoutFeedback>
            <View style={tw`flex-row justify-between items-center border-t border-gray-200 px-5 py-2`}>
              <TextInput
                style={tw`h-10 text-lg`}
                placeholder="Send a Message..."
              // onChangeText={setInput}
              // onSubmitEditing={sendMessage}
              // value={input}
              />
              {/* <Button title="Send" color="#FF5864" onPress={sendMessage} /> */}
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Container>
    </ScrollView>
  );
}

export default MessageScreen;