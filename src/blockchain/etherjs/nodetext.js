const  {ethers}  = require('ethers');
    // const provider = new ethers.providers.JsonRpcProvider();
    const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/d9ba4d2b8d794e18a15c785b06d171ca");
    // const signer = provider.getSigner();
    // const privateKey = "af28d50f35dff3890a623374f65656227d9c7b92d9fee07ffa398657047c5ebd";
    const privateKey = "39aad856cd1eee56fc2f94c754e853ef353feccff38ad57176869d7c5784ff23";  // mi wallet privada las dos tienen que estar relacionadas
    const Address = '0x436Af34eBF3085cE92780c853e429d29A2CE4AA1'; // la dirección del contrato NFT
    const signer = new ethers.Wallet(privateKey, provider);
    const abi = require('../abi/abi')
    // const wallet = new ethers.Wallet(privateKey, provider);
    
    // const accountAddress = wallet.getAddress();
    const contract = new ethers.Contract(Address, abi, signer);
    // contract._setMod(2)
      // contract._mintTokenAllowedToEarn("0x41603311FC9A25E16c90Df3c1F2CeFf2D36BeD69", 35)
// 0x621f47478a55583084e9bD70e535D509f95D9B78 mi wallet publica

    contract.setPoolNFT("0xE9375787363239b3Ab08c4341B94E8Efd9471CbD","0xE9375787363239b3Ab08c4341B94E8Efd9471CbD")

// contract._safeTransfer("0x621f47478a55583084e9bD70e535D509f95D9B78", 5)  //transferir nft

// contract.upgrade(1,2,3)
// .then(cantidadmint=>{
//     console.log(cantidadmint)})

// contract.tokenURI(10)
// contract.downgrade(20)
    // .then(cantidadmint=>{
    //  console.log(cantidadmint)})


  // contract.balance()
  // .then(cantidadmint=>{
  //   console.log(cantidadmint.toString())})
  
  // .then(lol =>{
  //   console.log(lol)
  // })
  // .catch(error=>{
  //   console.log(error)
  // })




// wallet.unlock().then(() => {
//     // Enviar transacción
//     const tx = {
//       to: '0x621f47478a55583084e9bD70e535D509f95D9B78',
//       value: ethers.utils.parseEther('1')
//     };
  
//     wallet.sendTransaction(tx)
//       .then(console.log)
//       .catch(console.error);
//   })
//   .catch(console.error);