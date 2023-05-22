// const hre = require('hre')
async function main() {
    const uri =  'https://terrabellum.s3.sa-east-1.amazonaws.com/Jsoncharacters/'
    const Contract = await ethers.getContractFactory("InnomicNFT");
    // const contractMarket = process.env.CONTRACT_MARKET;
    const contract = await Contract.deploy('Innomicv3','Inno', uri);
    
    const addreses = await contract.address;
    console.log("contrato: ",addreses)
    await contract.deployed();
    console.log("fue deployado :o")
  }

  // address : NEW 0x7751611Ef1581b7487AC92a5d3450233cB1B7007 || SEPOLIA 0x065c2a2966d9dE9c1da80d5767287493411014eE

  main()