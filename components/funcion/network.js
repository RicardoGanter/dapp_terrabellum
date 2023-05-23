import Web3Modal from "web3modal";
import { ethers } from "ethers";
const NetworkGoerliEth = async ()=>{
    const web3Modal = new Web3Modal({
        network: "sepolia",
        cacheProvider: true,
        providerOptions: {
        gasPrice: 21200000000,
        gas: 3022000000,
        gasLimit: 110333333000000
        }, // Opciones del proveedor
    });
    const provider = await web3Modal.connect();
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();
    return signer;
}

export default NetworkGoerliEth;