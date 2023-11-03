const hre = require("hardhat");

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const NFTMarket = await NFTMarketplace.deploy();

  await NFTMarket.deployed();

  console.log(
    "***********************************************************************************"
  );
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log(
    "***********************************************************************************\n"
  );
  console.log(`NFTMarketplace Contract: `, "\n");
  console.log(`${NFTMarket.address}`, "\n");
  console.log(
    "***********************************************************************************"
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

//Deployed ADDRESS:0x6053555cFae65e6995930C1f1445c2303198d090
