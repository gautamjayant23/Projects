require("@nomicfoundation/hardhat-toolbox");

const privateKey =
  "c34149eb9ac1a5c5007e3c906c39563b8c79867559d1b5c22146dc7beb645f7f"; // my wallet private key polygon mumbai testnework
//  alchemy polygone mumbai testnet api key
const INFURA_API_KEY = "43f909f3d62347af812ce236301d7bb9"; //Infura apikey

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [privateKey],
    },
  },
};
