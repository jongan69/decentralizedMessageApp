const getById = async () => {
  const response = await fetch(
    `mobilenft-api-kiosk-l3uje2nyv-btmcompliance.vercel.app/api/shared/nfts/nftList`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  console.log('getById res')
  return data;
}
