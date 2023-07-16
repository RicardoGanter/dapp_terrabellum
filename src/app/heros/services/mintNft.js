import ConnectInnomicNft from "components/funcion/connectinnomicnft";
import { Fetch } from "utils/fetch/fetch";

const mintNft = async ()=>{
    try{
        const getAddress = window.ethereum.selectedAddress 
        const contract = await ConnectInnomicNft(); 
        const URI = await Fetch('https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/Mintt', 'GET')
        const numberNft = await URI.json() 
        const propability = numberNft.message
        if(propability){  
            const mint = await contract._mintTokenAllowedToEarn(getAddress,propability,{
                value: BigInt(10000000000000000),
                gasLimit: 1000000
              });
              localStorage.removeItem('nftdata')
              localStorage.removeItem('nftdataseller') 
            return mint
        }
    }
    catch(error){
        console.log(error);
    }
  }

  export default mintNft