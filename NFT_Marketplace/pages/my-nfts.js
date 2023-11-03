import { useState, useEffect, useContext } from "react";
import { NFTContext } from "../context/NFTcontext";
import { NFTCard } from "../components";

const MyNFTs = () => {
  const { fetchMyNFTsOrListerNFTs, currentAccount } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    fetchMyNFTsOrListerNFTs("fetchMyNFTs")
      .then((items) => {
        setNfts(items);
        setNftsCopy(items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onHandleSearch = (value) => {
    const filteredNFTs = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNFTs.length) {
      setNfts(filteredNFTs);
    } else {
      setNfts(nftsCopy);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <div
          name="Your NFTs"
          className="text-center mb-4 h-20 justify-center"
        />

        <div className="flexCenter flex-col -mt-20 z-0">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">
            Wallet Address: {currentAccount}
          </p>
        </div>
      </div>

      {!nfts.length && !nftsCopy.length ? (
        <div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">
            No NFTs are Owned by You
          </p>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
          <div className="w-full flex flex-wrap mt-3">
            {nfts.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} onProfilePage />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNFTs;
