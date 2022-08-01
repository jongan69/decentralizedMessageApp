import { client } from './client'

const getCurrentUserInfo = async (walletAddress) => {
  try {
    const query = `
      *[_type == "users" && _id == "${walletAddress}"]{
          name,
          walletAddress,
          "imageUrl": profileImage.asset->url
        }
    `

    const sanityResponse = await client.fetch(query)

    console.log('Fetching Current User from Sanity')
    return sanityResponse
  } catch (error) {
    console.log('error', error)
  }
}

export default getCurrentUserInfo