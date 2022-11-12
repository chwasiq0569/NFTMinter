const key = "00d934ccd6fa8b980857";
const secret =
  "c24022015311e0cf86302bce2ee8cdd5d386f0935c4c5ef626b63dd9cad53885";
const axios = require("axios");

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(JSONBody),
    headers: {
      pinata_api_key: key,
      pinata_secret_api_key: secret,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      return {
        success: true,
        pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response?.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};
