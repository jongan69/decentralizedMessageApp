import React from "react";
import { Image, Text, View } from "react-native";
import { Card } from "react-native-paper";
import tw from 'twrnc';

export const NFTCard = (imageUrl: string, title: string) => {
  return (
    <Card>
      <View>
        <Image
          style={tw`rounded contain`}
          key="NFT"
          source={{ uri: imageUrl }}
        />
      </View>
      <Text>{title}</Text>
    </Card>
  )
}

export default NFTCard;