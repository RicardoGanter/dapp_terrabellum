// const hre = require('hre')

async function main() {
    // await hre.run('compile')

    const [deployer] = await ethers.getSigners();
  
    console.log("este es tu addres:", deployer.address);
  
    console.log("este es tu balance:", (await deployer.getBalance()).toString());
    const uri = 'https://ipfs.io/ipfs/QmVPqReUDz3r7DHAJDMxgaDXwtWckUJQqsQWSgR5uNQYHn/'
    const Contract = await ethers.getContractFactory("InnomicNFT");

    const contract = await Contract.deploy('moneafacha','INNO', uri, [1,2,3,4,5,6,7,8], ["1","2","3","4","5","6","7","8"],8,0,[],0,[]);
    // const token = await Token.deploy('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC')
    // await token.deployed();
    // await token.methods;
    const addreses = token.address;
    console.log(addreses)

    // const lal = await token._mintTokenAllowedToEarn('0x6749Cd2AfDd2Be6ef0cc4DeF385A6F38D47Adc6c')
    // console.log(lal)

    // const lol = await  token.balance()
    // console.log(lol)



    // addres del contract:0x5FbDB2315678afecb367f032d93F642f64180aa3
    // console.log("respuesta:", token.ownerOf.call((err, result)=>{console.log(result)}));
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });