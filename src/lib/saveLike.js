import { client } from './client'

const saveLike = async (currentUserWallet, likedUserAddress) => {
  try {
    await client
      .patch(currentUserWallet)
      .setIfMissing({ likes: [] })
      .insert('after', 'likes[-1]', [
        {
          _key: `${likedUserAddress} - ${currentUserWallet}`,
          _ref: likedUserAddress,
          _type: 'reference',
        },
      ])
      .commit()

    console.log('saved like')
  } catch (error) {
    console.log('error', error)
  }
}

export default saveLike