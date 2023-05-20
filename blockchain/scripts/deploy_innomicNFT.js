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

  // address : 0x93a6B40Ff6101246b1eE6BAD63DeC48d41E2786f  ||   NEW 0x7751611Ef1581b7487AC92a5d3450233cB1B7007

  main()