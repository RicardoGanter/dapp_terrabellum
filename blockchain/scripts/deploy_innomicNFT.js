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

  // address : NEW 0x7751611Ef1581b7487AC92a5d3450233cB1B7007 || SEPOLIA 0x8bfB2836697F6D2bb4e2133fF876A24e693B4e2d

  main()