// import { ethers } from 'ethers';

// // Crea una instancia de la clase ethers.providers.Web3Provider
// const Lal = async()=>{


// const provider = new ethers.providers.Web3Provider(window.ethereum);

// // Crea una instancia de la clase ethers.Contract
// const contractAddress = '0x472D4625B8f53F04694FB1483cB764702241A7cC'; // Dirección del contrato
// const abi = require('../web3/abi.js')
// const contract = new ethers.Contract(contractAddress, abi, provider);

// // Obtén la cuenta activa de MetaMask
// const signer = provider.getSigner();
// const account = await signer.getAddress(); //este codigo consigue el addres conectado :O
// console.log(account)
// // Crea una transacción firmada
// const tx = await contract._mintTokenAllowedToEarn("0x621f47478a55583084e9bD70e535D509f95D9B78 ", { from: account });
// const txResponse = await signer.sendTransaction(tx);

// // Espera a que la transacción sea confirmada
// await txResponse.wait();
// }

// export default Lal;


import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

const contractAddress = '0x85721b88Bd588f433601AF9ad505BDC633cc86B9'; // Dirección del contrato
const abi = require('../web3/abi.js')
const providerOptions = {
  rpc: {
    5: 'https://eth-goerli.g.alchemy.com/v2/gIYahKEbCs9lj1MRp6mwlzYHxonY3hYL'
  }
};


const connectWallet = async () => {
    const web3Modal = new Web3Modal({
        network: "goerli",
        cacheProvider: true,
        providerOptions // opciones del proveedor
      });
    
      web3Modal.connect()
      .then(provider => {
        console.log(provider);
        // Ejecuta las funciones de tu contrato aquí
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();
        // const account = signer.getAddress();
        // console.log(account)
        const contract = new ethers.Contract(contractAddress, abi, signer);
        contract._mintTokenAllowedToEarn("0x621f47478a55583084e9bD70e535D509f95D9B78");

      })
      .catch(error => {
        console.log(error);
      });
}
// export {signer}
export default connectWallet;