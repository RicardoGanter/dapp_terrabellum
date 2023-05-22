import NetworkGoerliEth from "./network.js";
import { ethers } from "ethers";
const ConnectInnomicNft = async () =>{
    const signer = await NetworkGoerliEth();
    const abi = require("../../blockchain/abi/abi.js");
    const contractAddress = "0x065c2a2966d9dE9c1da80d5767287493411014eE";  //CONTRATO PRINCIPAL (INNOMICNFT)
    const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
    );
    return contract;
}    

export default ConnectInnomicNft;