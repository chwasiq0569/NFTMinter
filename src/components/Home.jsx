import WalletBalance from "./WalletBalance";
import { useEffect, useState } from "react";
import PlaceholderImg from "../img/placeholder.png";
import { ethers } from "ethers";
import FiredGuys from "../artifacts/contracts/MyNFT.sol/FiredGuys.json";
import { pinJSONToIPFS } from "./../utils/pinata";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, FiredGuys.abi, signer);

function Home() {
  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };

  return (
    <div>
      <WalletBalance />

      <h1>Fired Guys NFT Collection</h1>
      <div className="container">
        <div className="row">
          {Array(totalMinted + 1)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="col-sm">
                <NFTImage tokenId={i} getCount={getCount} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function NFTImage({ tokenId, getCount }) {
  const [metadataURI, setMetaDataURI] = useState("");

  // const contentId = "QmTBxFm3SU3pmWQgGzb2ApZe9oMD6amZCAkyVa6HyvMDxB";
  // const metadataURI = `${contentId}/${tokenId}.json`;
  // const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
  // //   const imageURI = `img/${tokenId}.png`;
  // const [isMinted, setIsMinted] = useState(false);
  // useEffect(() => {
  //   getMintedStatus();
  // }, [isMinted]);

  // const getMintedStatus = async () => {
  //   const result = await contract.isContentOwned(metadataURI);
  //   console.log(result);
  //   setIsMinted(result);
  // };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther("0.05"),
    });

    let res = await result.wait();
    console.log("res", res);
    // getMintedStatus();
    getCount();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }

  // console.log("isMinted", isMinted);

  const postData = async () => {
    const metadata = new Object();
    metadata.name = "MYICON22";
    metadata.image = PlaceholderImg;
    metadata.description = "No Description22";

    //pinata pin request
    const pinataResponse = await pinJSONToIPFS(metadata);
    setMetaDataURI(pinataResponse);
    console.log("metadataURI", metadataURI);
  };

  useEffect(() => {}, []);

  return (
    <div className="card" style={{ width: "18rem" }}>
      {/* <img
        className="card-img-top"
        src={isMinted ? imageURI : PlaceholderImg}
      ></img>
      <div className="card-body">
        <h5 className="card-title">ID #{tokenId}</h5>
        {!isMinted ? (
          ) : (
            <button className="btn btn-secondary" onClick={getURI}>
            Taken! Show URI
            </button>
            )}
          </div> */}
      <button className="btn btn-primary" onClick={mintToken}>
        Mint
      </button>
      <button onClick={postData}>SAVE</button>
    </div>
  );
}

export default Home;
