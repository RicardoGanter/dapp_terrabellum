import NetworkGoerliEth from "./network.js";
import { ethers } from "ethers";
const ConnectInnomicNft = async () =>{
    const signer = await NetworkGoerliEth();
    const abi = require("../../components/abi/abi.js");
    const contractAddress = "0x436Af34eBF3085cE92780c853e429d29A2CE4AA1" ;  //CONTRATO PRINCIPAL (INNOMICNFT)
    const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
    );
    return contract;
}    

export default ConnectInnomicNft;