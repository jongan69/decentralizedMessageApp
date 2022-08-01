import 'isomorphic-fetch';

const getList = async () => {
  const response = await fetch(`https://next-nft.herokuapp.com/api/nfts`);
  const data = await response.json();
  console.log('getList res')
  return data;
}

export default getList