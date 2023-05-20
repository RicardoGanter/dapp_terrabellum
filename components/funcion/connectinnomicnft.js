import NetworkGoerliEth from "./network.js";
import { ethers } from "ethers";
const ConnectInnomicNft = async () =>{
    const signer = await NetworkGoerliEth();
    const abi = require("../../blockchain/abi/abi.js");
    const contractAddress = "0x7751611Ef1581b7487AC92a5d3450233cB1B7007";  //CONTRATO PRINCIPAL (INNOMICNFT)
    const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
    );
    return contract;
}    

export default ConnectInnomicNft;