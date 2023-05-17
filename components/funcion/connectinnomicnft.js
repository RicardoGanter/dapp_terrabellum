import NetworkGoerliEth from "./network.js";
import { ethers } from "ethers";
const ConnectInnomicNft = async () =>{
    const signer = await NetworkGoerliEth();
    const abi = require("../../blockchain/abi/abi.js");
    const contractAddress = "0x93a6B40Ff6101246b1eE6BAD63DeC48d41E2786f";  //CONTRATO PRINCIPAL (INNOMICNFT)
    const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
    );
    return contract;
}    

export default ConnectInnomicNft;