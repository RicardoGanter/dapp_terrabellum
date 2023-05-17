import { useEffect, useState } from 'react';
import { getStoredAddress } from '@/components/loginmetamask.js';
const  {ethers}  = require('ethers');
import Web3Modal from "web3modal";

    const Funcioncontract = async()=>{
    // Creamos una instancia de proveedor de web3 utilizando Web3Modal
const providerOptions = {
    /* Configuración del proveedor de web3 */
    alchemy: {
        rpcUrl: "https://eth-goerli.alchemyapi.io/v2/gIYahKEbCs9lj1MRp6mwlzYHxonY3hYL",
      },
  };
  const web3Modal = new Web3Modal({
    network: "goerli",
    providerOptions,
  });



    const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/gIYahKEbCs9lj1MRp6mwlzYHxonY3hYL");
    // const privateKey = "a43171098a3ea626a1e63f45a1ad72adedf9e162efbffdbe065aaaa7a62c4cb4";
    
    // setTimeout(() => {
    //     const address = getStoredAddress();
    //     console.log(address);
    //   }, 1000);

      const signer = ()=>{ provider.getSigner("0x621f47478a55583084e9bD70e535D509f95D9B78");}
    // const privateKey = "af28d50f35dff3890a623374f65656227d9c7b92d9fee07ffa398657047c5ebd";
    // const signer = new ethers.Wallet(privateKey, provider);


    // const signer = provider.getSigner();
    const Address = '0x472D4625B8f53F04694FB1483cB764702241A7cC'; // la dirección del contrato NFT
    const abi = require('../web3/abi.js')
    // const privateKey = 'af28d50f35dff3890a623374f65656227d9c7b92d9fee07ffa398657047c5ebd'; // clave privada de la cuenta
    // const wallet = new ethers.Wallet(privateKey, provider);
    // const accountAddress = wallet.getAddress();
    const contract = new ethers.Contract(Address, abi, provider);
    // const contract = new ethers.Contract(Address, abi, provider.getSigner(`${userAddress}`));
    async function handleClick() {
        // Obtenemos la instancia de proveedor de web3 activa
        const provider = await web3Modal.connect();
        // Creamos una instancia de proveedor de ethers utilizando el proveedor de web3
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        console.log(ethersProvider)
        // Creamos una instancia de contrato a partir de su dirección y ABI utilizando el proveedor de ethers
        const contract = new ethers.Contract(Address, abi, ethersProvider.getSigner());
        // Enviamos una transacción para ejecutar una función del contrato
        const tx = await contract._mintTokenAllowedToEarn("0x621f47478a55583084e9bD70e535D509f95D9B78 ", { gasLimit: 1000000 });
        await tx.wait();
      }
      handleClick()
        // const authorizedContractForUser = authorizedContract.connect(signer);
      
        // const result = await authorizedContractForUser.authorizedFunctionForUser();
        // console.log(result);
    

    // const result = await contract._mintTokenAllowedToEarn("0x65197058cE55937675d604B89e6404816BF1b797",{ from: signer })
    //     contract.balance()
    //     .then(cantidadmint=>{
    //     console.log(cantidadmint.toString())})
    }
    
export default Funcioncontract;











    // export const mint = ()=>{ 
    //     contract._mintTokenAllowedToEarn('0x621f47478a55583084e9bD70e535D509f95D9B78')
    //   }
      
    //   export const Balance = ()=>{
    //     const [balance, setBalance]= useState(null)
    //     useEffect(()=>{
    //     contract.balance()
    //     .then(cantidadmint=>{
    //       setBalance(cantidadmint.toString())
    //   })
    //   },[])
    //   return(
    //     <div>
    //       {balance && <h1 style={{color:'white'}}>{balance}</h1>}
    //     </div>
    //   )
    //   }
      
      
    //   export const Tokenuri = ()=>{  
    //     // const [tokenuri, setTokenuri]= useState(null)
    //     contract.tokenURI(1)
    //     .then((tokenURI)=>{
    //     const stringtoken = tokenURI.toString()
    //     console.log(stringtoken.replace('https://ipfs.io/ipfs/', ""))
      
    //   })
    //   }