import { client } from './client'

const getUsersInfo = async (walletAddress) => {
  try {
    const query = `
      *[_type == "users" && _id != "${walletAddress}"]{
          _id,
          name,
          walletAddress,
          userBio,
          "imageUrl": profileImage.asset->url
        }
    `

    const sanityResponse = await client.fetch(query)

    console.log('Getting other users from sanity: ', sanityResponse)
    return sanityResponse;
  } catch (error) {
    console.log('error', error)
  }
}

export default getUsersInfo