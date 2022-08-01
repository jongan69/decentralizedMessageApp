import React, { useContext } from "react";
import { View } from "react-native";
import styled from 'styled-components';
import tw from 'twrnc';
import { AppContext } from "../context/AppContext";
import SwipeableCard from "./SwipeableCard";

const Header = styled.Text`
    color: #000;
    font-size: 30px;
    width: 90%
    align-items: center;
    justify-content: center;
`

export const Home = () => {
  const { cardsData, currentUserWallet } = useContext(AppContext);
  return (
    <>
      <View style={[tw`bg-fuchsia-700`, { paddingTop: '20%', height: '100%', alignItems: "center" }]}>
        <Header style={tw`text-white`}>
          Match with Web3 friends!
        </Header>
        {cardsData && currentUserWallet && <SwipeableCard />}
      </View >
    </>
  )
}

export default Home;