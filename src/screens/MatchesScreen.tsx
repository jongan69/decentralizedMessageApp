import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import styled from 'styled-components';
import tw from 'twrnc';
import { AppContext } from "../context/AppContext";
import { client } from "../lib/client";

// import CardComponent from '../components/CardComponent';

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

const CardImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 20px;
`

const CardTitle = styled.Text`
    position: absolute;
    bottom: 0;
    margin: 10px;
    color: #fff;
`


export const MatchesScreen = () => {
  const { currentUserWallet } = useContext(AppContext);
  // const connector = useWalletConnect();
  // const navigate = Props.navigation.navigate

  const getMatches: () => Promise<void> = async () => {
    try {
      const query = `*[_type == "users" && _id =="${currentUserWallet}"]{
        matches[]-> {
          name,
          "imageUrl": profileImage.asset->url
        }
      }`;
      const data = await client.fetch(query);
      // console.log('Matches found', data)
      if (data) {
        setMatches(data[0].matches)
        console.log(matches)
      } else {
        setMatches([])
      }
    } catch (error) {
      console.log(error);
    }
  };


  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getMatches();
  }, []);

  return (
    <ScrollView style={tw`bg-cyan-700`}>
      <Container>
        <Header style={tw`text-white`}>
          Matches
        </Header>
        {matches !== null && matches.length > 0 &&
          <>
            {
              matches.map((match, index) => {
                return (
                  <>
                    <CardContainer key={index}>
                      <CardImage
                        source={{ uri: match.imageUrl }}
                      />
                      <CardTitle>{match.name}</CardTitle>
                    </CardContainer>
                  </>
                )
              })}
          </>
        }
      </Container>
    </ScrollView>
  );
}

export default MatchesScreen;