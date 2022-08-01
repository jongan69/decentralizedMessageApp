import { client } from './client'

const createUserOnSanity = async (walletAddress) => {
  try {

    // Default to Morgan Freeman
    const defaultProfileImage = `image-7ee657e888f359e353f596c3e9c9f07c3178f3e2-3338x3339-jpg`

    const userDoc = {
      _type: 'users',
      _id: walletAddress,
      name: walletAddress,
      walletAddress: walletAddress,
      owned: {
        _type: 'string',
        asset: {
          _type: "reference",
          _ref: walletAddress
        }
      },
      profileImage: {
        _type: 'image',
        asset: {
          _type: "reference",
          _ref: defaultProfileImage
        }
      }
    }

    const sanityResponse = await client.createIfNotExists(userDoc)

    console.log('Successfully Posted User to Sanity!')
    return sanityResponse;
  } catch (error) {
    console.log('error', error)
  }
}

export default createUserOnSanity