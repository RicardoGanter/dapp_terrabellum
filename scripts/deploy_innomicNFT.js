// const hre = require('hre')
async function main() {
    // await hre.run('compile')
    // const [deployer] = await ethers.getSigners();
    // console.log("este es tu addres:", deployer.address);
    // console.log("este es tu balance:", (await deployer.getBalance()).toString());
    const uri =  'https://ipfs.io/ipfs/QmPwJHPf6Gx6tj1V45g1bkDLMShkwJ6VNwRJZhXkhR8JwT/nftlvl1_1/'

    const Contract = await ethers.getContractFactory("InnomicNFT");

    const contract = await Contract.deploy('Innomicv2','Inno', uri, [1,2], ["1","2"],2,2,[1,2],0,[],"0x9bFfE512fa1595728f8dDCD8b5c9C59fcAF7056F");
    // const token = await Token.deploy('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC')
    
    const addreses = await contract.address;
    console.log("contrato: ",addreses)
    await contract.deployed();
    console.log("fue deployado :o")
  }
  
  main()


   // const lal = await contract._mintTokenAllowedToEarn('0x621f47478a55583084e9bD70e535D509f95D9B78')
    // console.log("lol",lal)
    // const lol = await  token.balance()
    // console.log(lol)
    // contract._mintTokenAllowedToEarn('0x621f47478a55583084e9bD70e535D509f95D9B78')
    // addres del contract:0x5FbDB2315678afecb367f032d93F642f64180aa3
    // console.log("respuesta:", token.ownerOf.call((err, result)=>{console.log(result)}));