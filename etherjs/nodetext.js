const  {ethers}  = require('ethers');
    // const provider = new ethers.providers.JsonRpcProvider();
    const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/gIYahKEbCs9lj1MRp6mwlzYHxonY3hYL");
    // const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/f8191b77762f407da099f89c34a57514')
    const privateKey = "a43171098a3ea626a1e63f45a1ad72adedf9e162efbffdbe065aaaa7a62c4cb4";
    // const MiContrato =  ethers.getContractFactory("InnomicNFT");
    // Obtener el ABI del contrato inteligente
    // const abi = MiContrato.interface.abi;
    const signer = new ethers.Wallet(privateKey, provider);
    // const signer = provider.getSigner();
    const Address = '0x03c6eC8abE655b40A57eEFbf0845bE619A9a831A'; // la dirección del contrato NFT
    const abi = require('../web3/abi.js')
    
    // const privateKey = 'af28d50f35dff3890a623374f65656227d9c7b92d9fee07ffa398657047c5ebd'; // clave privada de la cuenta
    // const wallet = new ethers.Wallet(privateKey, provider);

    
    // const accountAddress = wallet.getAddress();
const contract = new ethers.Contract(Address, abi, signer);
// 0x621f47478a55583084e9bD70e535D509f95D9B78 mi wallet publica

contract._safeTransfer()

  //  contract._mintTokenAllowedToEarn("0x65197058cE55937675d604B89e6404816BF1b797")
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