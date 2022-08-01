// import fs from 'expo-file-system'
import { client } from './client';

const updateProfileImage = async (walletAddress, profileImage) => {
  try {
    const sanityResponse = await client.patch(walletAddress)
      .set({
        profileImage: {
          _type: 'image',
          asset: {
            _type: "reference",
            _ref: profileImage._id
          }
        }
      }).commit()
    console.log('Successfully Updated User Profile Picture Sanity: ', sanityResponse)
    return sanityResponse;
  } catch (error) {
    console.log('error', error)
  }
}

export default updateProfileImage