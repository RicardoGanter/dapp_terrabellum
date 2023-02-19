// const hre = require('hre')

async function main() {
    // await hre.run('compile')

    const [deployer] = await ethers.getSigners();
  
    console.log("este es tu addres:", deployer.address);
  
    console.log("este es tu balance:", (await deployer.getBalance()).toString());
  
    const Token = await ethers.getContractFactory("NFTMarketplace");
    const token = await Token.deploy();
  
    await token.deployed();

    console.log("respuesta:", token.updateListingPrice());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });