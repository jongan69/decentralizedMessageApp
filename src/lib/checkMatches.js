import { client } from './client'

const checkMatches = async (currentUserWallet, likedUserAddress) => {
  try {
    const query = `
      *[_type == "users" && _id == "${likedUserAddress}"]{
         likes
        }
    `
    const sanityResponse = await client.fetch(query)
    let isMatch = false
    // console.log('check match sanity response: ', sanityResponse)
    if (sanityResponse[0].likes !== null) {
      sanityResponse[0].likes.forEach(likedUser => {
        if (likedUser._ref === currentUserWallet) {
          isMatch = true
        }
      })
    }


    console.log('Match found in Sanity', isMatch)
    return isMatch;
  } catch (error) {
    console.log('error', error)
  }
}

export default checkMatches;