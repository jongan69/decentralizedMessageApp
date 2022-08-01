import { client } from './client'

const saveMatch = async (currentUserWallet, likedUserAddress) => {
  try {
    // Save Match for loggedin user
    await client
      .patch(currentUserWallet)
      .setIfMissing({ matches: [] })
      .insert('after', 'matches[-1]', [
        {
          _key: `${likedUserAddress} - ${currentUserWallet}`,
          _ref: likedUserAddress,
          _type: 'reference',
        },
      ])
      .commit()

    // Save Match for liked user
    await client
      .patch(likedUserAddress)
      .setIfMissing({ matches: [] })
      .insert('after', 'matches[-1]', [
        {
          _key: `${currentUserWallet} - ${likedUserAddress}`,
          _ref: currentUserWallet,
          _type: 'reference',
        },
      ])
      .commit()

    console.log('Saved Match!')
  } catch (error) {
    console.log('error', error)
  }
}

export default saveMatch