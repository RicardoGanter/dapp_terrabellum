// const hre = require('hre')
async function main() {
    const uri =  'https://ipfs.io/ipfs/QmPwJHPf6Gx6tj1V45g1bkDLMShkwJ6VNwRJZhXkhR8JwT/nftlvl1_1/'
    const Contract = await ethers.getContractFactory("InnomicNFT");
    const contractMarket = process.env.CONTRACT_MARKET;
    const contract = await Contract.deploy('Innomicv2','Inno', uri, [1,2], ["1","2"],2,2,[1,2],0,[], contractMarket);
    
    const addreses = await contract.address;
    console.log("contrato: ",addreses)
    await contract.deployed();
    console.log("fue deployado :o")
  }

  // address : 0x93a6B40Ff6101246b1eE6BAD63DeC48d41E2786f

  main()