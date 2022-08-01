/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/AppContext';
import TinCard from './TinCard';


const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80%;
`

const CardContainer = styled.View`
    width: 100%;
    max-width: 80%;
    height: 300px;
`

const Card = styled.View`
    position: absolute;
    background-color: #fff;
    width: 100%;
    max-width: 500px;
    height: 500;
    shadow-color: black;
    shadow-opacity: 0.2;
    shadow-radius: 20px;
    border-radius: 20px;
    resize-mode: cover;
`

const CardImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 20px;
`

const CardTitle = styled.Text`
    position: absolute;
    bottom: 40;
    margin: 10px;
    color: #fff;
`

const CardBio = styled.Text`
    position: absolute;
    bottom: 0;
    margin: 10px;
    color: #fff;
    justify-content: center;
    z-index: 20;
`

const InfoText = styled.Text`
    height: 28px;
    justify-content: center;
    display: flex;
    z-index: -100;
`

const SwipeableCard = () => {
  const { cardsData, currentUserWallet, handleRightSwipe } = useContext(AppContext)
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (cardsData && cardsData.length > 0) {
      setUsers(cardsData)
      console.log('Users in Swipe card: ', users)

    }
  }, [cardsData])

  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction: undefined, userAddress: string) => {
    console.log(`removing: ${userAddress}`)
    if (direction === 'right') {
      handleRightSwipe(currentUserWallet, userAddress)
    }
    setLastDirection(direction)
  }

  const outOfFrame = (name: string) => {
    console.log(`${name} left the screen!`)
  }

  return (
    <Container>
      <CardContainer>
        <>
          {users.map((user) => {
            return (
              <TinCard
                key={user._id}
                onSwipe={(dir) => swiped(dir, user.walletAddress)}
                onCardLeftScreen={() => outOfFrame(user.name)}
              >
                <Card>
                  <CardImage source={{ uri: user.imageUrl }}>
                    <CardBio>{user.userBio}</CardBio>
                    <CardTitle>{user.name}</CardTitle>
                  </CardImage>
                </Card>
              </TinCard>
            )
          })}
        </>
      </CardContainer>
      {lastDirection ? <InfoText>You swiped {lastDirection}</InfoText> : <InfoText />}
    </Container>
  )
}

export default SwipeableCard