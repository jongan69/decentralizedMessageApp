import { client } from './client'

const createNftsOnSanity = async (walletAddress, nft) => {
  try {
    console.log('Posting NFT to Sanity: ', nft.name)
    const nftDoc = {
      _type: 'nfts',
      _id: `${nft.tokenId}_${nft.tokenBalance}`,
      nftName: nft.name,
      nftContractAddress: nft.contractAddress,
      nftTokenId: nft.tokenId,
      nftTokenBalance: nft.tokenBalance,
      urls: nft.urls,
      owner: walletAddress
    }
    await client.createOrReplace(nftDoc)
    console.log('Successfully Posted NFT to Sanity!')
  } catch (error) {
    console.log('error', error)
  }
}

export default createNftsOnSanity