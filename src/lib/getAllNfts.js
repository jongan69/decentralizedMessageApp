import { ALCHEMY_API_KEY } from '@env';
import createNftsOnSanity from './createNfts';

const getAllNfts = async (walletAddress) => {

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${ALCHEMY_API_KEY}/getNFTs/`;
  const ownerAddr = walletAddress;
  const fetchURL = `${baseURL}?owner=${ownerAddr}`;

  fetch(fetchURL, requestOptions)
    .then(response => response.json())
    .then(response => {
      console.log('# of nfts found: ', response.totalCount)
      const ownedNFTs = []
      response?.ownedNfts.forEach((item, index) => {
        const urls = [];

        // Check for URLs in NFT
        if (item.media) {
          Object.values(item.media[0]).forEach((item) => {
            const URL = item
            if (URL.indexOf("http://") === 0 || URL.indexOf("https://") === 0) {
              urls.push(URL)
            }
          })

          // To do: Check if an ENS Domain NFT was found
          // if Contract address = 0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85 return true

          ownedNFTs.push({
            "name": item.metadata.name, // string of name
            "contractAddress": item.contract.address, // string of contract address
            "tokenId": item.id.tokenId, // string of token id
            "tokenBalance": item.balance, // string of token balance
            "urls": urls // array of urls
          });
        }
      })

      // ownedNFTs.forEach((item, index) => {
      //   if (item.urls.length > 0) {
      //     item.urls.forEach((url) => {
      //       console.log(`NFT #${index} has URL ${url}`)
      //     })
      //   }
      // })

      ownedNFTs.forEach((item, index) => {
        createNftsOnSanity(walletAddress, item);
        console.log(`NFT #${index} is being posted with name ${item.name}`)
      })

      return ownedNFTs
    })
    .catch(error => console.log('error', error))
}

export default getAllNfts;