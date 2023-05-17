import NetworkGoerliEth from "./network.js";
import { ethers } from "ethers";
const ConnectMarket = async ()=>{
    const signer = await NetworkGoerliEth();
      const abi = require("../../blockchain/abi/abinft.js");
      const contractAddress = "0x964D7ea49a7d96443ed6cCeE4973151E5E424017";  //CONTRATO MARKET
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );
      return contract;
}
export default ConnectMarket;