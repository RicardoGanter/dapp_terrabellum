import Web3 from "web3"
// import Nftmarket from '../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json'
import { useState } from 'react';

const Sosol = ()=>{
    const [state, setState] = useState({
        account: '0x0',
        loading: true,
        nftmarket: {},
      });
    
    function loadsos(){
         this.loadWeb3()
         this.loadBlockchianData( )
    }

    const loadWeb3= async ()=>{
        if (window.ethereum){
            window.web3 = new Web3(window.ethereum)
            const accounts = await window.ethereum.request({method: 'eth_reqquestAccounts'})
            console.log('Accounts:', accounts)
        }
    }

    const loadBlockchianData= async ()=>{
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        setState({ account: accounts[0]})
        console.log("Acount[0]; ", accounts[0])
        //agregar red
        const networkId = await web3.eth.net.getId()
        console.log('networkid: ', networkId)

        //traer los datos del smart contract
        const NftMarket = Nftmarket.networks(networkId)
        if(NftMarket){
            const nftmarket = new web3.eth.Contract(Nftmarket.abi, Nftmarket.address)
            setState({nftmarket: nftmarket})
            let nftMarketBalance = await nftmarket.methods.balanceOf(accounts[0].call())
            console.log(nftMarketBalance)
        }
        
        loadsos()
        
    }
}

export default Sosol;