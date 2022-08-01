import { useWalletConnect } from "@walletconnect/react-native-dapp";
import SvgUri from "expo-svg-uri";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import ImageBlurLoading from 'react-native-image-blur-loading';
import styled from 'styled-components';
import tw from 'twrnc';

// import CardComponent from '../components/CardComponent';
import { client } from "../lib/client";

const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const Header = styled.Text`
    color: #000;
    font-size: 30px;
    margin-bottom: 30px;
    margin-top: 20%
`

const CardContainer = styled.View`
    width: 90%;
    max-width: 260px;
    height: 300px;
    padding: 1%
`

// const CardImage = styled.ImageBackground`
//     width: 100%;
//     height: 100%;
//     overflow: hidden;
//     border-radius: 20px;
// `

const CardTitle = styled.Text`
    position: absolute;
    bottom: 0;
    margin: 10px;
    color: #fff;
`


export const OwnedNFTsScreen = () => {
  const connector = useWalletConnect();
  // const navigate = Props.navigation.navigate

  const getOwnedNfts: () => Promise<void> = async () => {
    try {
      const query = '*[_type == "nfts"]';
      const data = await client.fetch(query);
      console.log(data)
      if (data) {
        setNfs(data)
      } else {
        setNfs([])
      }
    } catch (error) {
      console.log(error);
    }
  };


  const [nfts, setNfs] = useState([]);

  useEffect(() => {
    getOwnedNfts();
  }, []);

  return (
    <ScrollView style={tw`bg-black`}>
      <Container style={tw`bg-black`}>
        <Header style={tw`text-white`}>
          Owned NFTs
        </Header>
        {nfts.length > 0 &&
          <>
            {
              nfts.map((item, index) => {
                if (item.owner === connector.accounts[0]) {
                  return (
                    <CardContainer key={index} style={{ borderRadius: '20px' }} >
                      <ImageBlurLoading
                        thumbnailSource={{ uri: 'https://i.pinimg.com/originals/71/66/e4/7166e4a81275ac7d9cebc4e193d21870.jpg' }}
                        source={{ uri: item.urls[0] }}
                        style={{ flex: 1, width: '100%', height: '100%', resizeMode: 'contain' }}
                      />
                      <SvgUri
                        width="200"
                        height="200"
                        source={{
                          uri: item.urls[0]
                        }}
                      />
                      <CardTitle>{item.nftName}</CardTitle>
                    </CardContainer>
                  )
                }
              })
            }
          </>
        }
      </Container>
    </ScrollView>
  );
}

export default OwnedNFTsScreen;