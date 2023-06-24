import Web3Modal from "web3modal";
import { ethers } from "ethers";
const NetworkGoerliEth = async ()=>{
    const web3Modal = new Web3Modal({
        network: "sepolia",
        cacheProvider: true,
        providerOptions: { 
        gasLimit: 22344071,
        metamask: {
            display: {
                name: "MetaMask",
                description: "Connect with MetaMask",
            },
            package: null, // No necesitas especificar el paquete para MetaMask
            connector: async () => {
                if (window.ethereum) {
                    // Conexión a través de MetaMask
                    await window.ethereum.enable();
                    return window.ethereum;
                } else {
                    throw new Error("MetaMask not found");
                }
            },
        },
        }, // Opciones del proveedor
    });
    const provider = await web3Modal.connect();  
    const ethersProvider =  new ethers.providers.Web3Provider(provider); 
    const signer =  ethersProvider.getSigner();  
    return signer;
}
export default NetworkGoerliEth;