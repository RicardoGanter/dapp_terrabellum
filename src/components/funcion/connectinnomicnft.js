import NetworkGoerliEth from "./network.js";
import { ethers } from "ethers";
const ConnectInnomicNft = async () =>{
    const signer = await NetworkGoerliEth();
    const abi = require("../../blockchain/abi/abi.js");
    const contractAddress = "0x8bfB2836697F6D2bb4e2133fF876A24e693B4e2d" ;  //CONTRATO PRINCIPAL (INNOMICNFT)
    const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
    );
    return contract;
}    

export default ConnectInnomicNft;