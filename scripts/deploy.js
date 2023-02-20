// const hre = require('hre')

async function main() {
    // await hre.run('compile')

    const [deployer] = await ethers.getSigners();
  
    console.log("este es tu addres:", deployer.address);
  
    console.log("este es tu balance:", (await deployer.getBalance()).toString());
  
    const Token = await ethers.getContractFactory("DiegoCorpNFT");
    const token = await Token.deploy('moneafacha','INNO');
  
    await token.deployed();
    console.log("respuesta:", token.address)
    // addres del contract:0x5FbDB2315678afecb367f032d93F642f64180aa3
    // console.log("respuesta:", token.ownerOf(tokenId=1));
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });