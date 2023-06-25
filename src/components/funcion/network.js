import { ethers } from "ethers";

const NetworkGoerliEth = async () => {
  if (window.ethereum) {
    // Conexión a través de MetaMask
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return signer;
  } else {
    throw new Error("MetaMask not found");
  }
};

export default NetworkGoerliEth;
