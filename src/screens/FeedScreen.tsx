import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { client } from "../lib/client";


export const LikedScreen = () => {
  // const navigate = Props.navigation.navigate
  const getLikes: () => Promise<void> = async () => {
    try {
      const query = '*[_type == "users"]';
      const data = await client.fetch(query);

      console.log(data)
      if (data) {
        setLikes(data);
        Alert.alert('getLikes ran', likes.toString());
      } else {
        setLikes([])
      }
    } catch (error) {
      console.log(error);
    }
  };


  const [likes, setLikes] = useState([]);
  useEffect(() => {
    getLikes();
  }, []);

  return (
    <View>
      <Text> Liked NFTs </Text>
    </View>
  );
}

export default LikedScreen;