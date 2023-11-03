import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { NFTCard } from "../components";
import { NFTContext } from "../context/NFTcontext";

const Home = () => {
  const [nfts, setNfts] = useState([]);
  const { fetchNFTs } = useContext(NFTContext);

  useEffect(() => {
    fetchNFTs().then((items) => {
      setNfts(items.reverse());
    });
  }, []);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <Head>
        <title>NFT Marketplace</title>
        <meta
          name="description"
          content="This is NFT Marketplace for Minting, buy and Sale NFT"
        />
      </Head>
      <div className="w-full minmd:w-4/5">
        {
          <>
            <div>
              <h1 className="font-bold text-4xl">NFT Marketplace</h1>
            </div>

            <div className="mt-10">
              <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
                  Top Marktplace NFTs
                </h1>
              </div>
              <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                {nfts.map((nft) => (
                  <NFTCard key={nft.tokenId} nft={nft} />
                ))}
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default Home;
