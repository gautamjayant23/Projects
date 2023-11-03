# NFT Marketplace

The NFT Marketplace project is designed to Mint & List NFTs in Marketplace, so that users can Buy, sell, Resell NFTs.
Solidity is used to develop the smart contracts.
Metamask Wallet is used for transaction and interaction with the blockchain.
IPFS using Infura Network is used for NFT storage.
Front end is developed using Next.js, React.js and Node.js.
Smart Contract is deployed on Polygon Mumbai test network.

## Steps to setup and run NFTMarketplace Project

    ## 1. Clone the Github repository or download zip file from Github.

    ## 2. Install dependencies

        $ cd NFT_Marketplace
        $ npm install

    ## 3. Change mentioned properties in below Files

            # hardhat.config.js
                $ INFURA_API_KEY
                $ privateKey
            # context/NFTcontext.js
                $ infuraProjectId
                $ infuraProjectSecret
                $ INFURA_API_KEY

    ## 4. Deployment Solidity Contract Addresses

        $ npx hardhat run scripts/deploy.js --network mumbai

        #After deploying the NFTMarketplace.sol replace deployed contract address in the /context/contants.js in below variable:

            export const MarketAddress = "0x6053555cFae65e6995930C1f1445c2303198d090"; //Deployed Contract Address of NFTMarketplace.sol

    ## 5. Running NFTMarketplace application on Localhost

        npm run dev

        http://localhost:3000/
