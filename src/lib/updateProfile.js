import { client } from './client'

const createUserOnSanity = async (walletAddress, name, userBio) => {
  try {

    const sanityResponse = await client.patch(walletAddress).set({
      name: name,
      userBio: userBio
    }).commit()

    console.log('Successfully Updated User to Sanity: ', sanityResponse)
    return sanityResponse;
  } catch (error) {
    console.log('error', error)
  }
}

export default createUserOnSanity