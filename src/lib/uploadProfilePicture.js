// import fs from 'expo-file-system'
import { client } from './client'
import updateProfileImage from './updateProfilePicture'

const uploadProfileImage = async (profileImage, walletAddress) => {
  try {
    const sanityResponse = await client.assets
      .upload('image', profileImage)
      .then(async (document) => {
        console.log('The image was uploaded!', document)
        updateProfileImage(walletAddress, document)
      }).catch((error) => {
        console.error('Upload failed:', error.message)
      })
    return sanityResponse;
  } catch (error) {
    console.log('error', error)
  }
}

export default uploadProfileImage