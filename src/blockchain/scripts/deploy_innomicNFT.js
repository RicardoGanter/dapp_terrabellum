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

  // address : NEW 0x436Af34eBF3085cE92780c853e429d29A2CE4AA1 || SEPOLIA 0x8bfB2836697F6D2bb4e2133fF876A24e693B4e2d

  main()