/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
module.exports = {
  // networks: {
  //   hardhat: {
  //     gas: 4000000000000000,
  //   },
  // },
  
  ganache: {
      url: "http://localhost:7545", // Cambia el puerto si ganache está ejecutando en un puerto diferente
      chainId: 1337, // Cambia este valor si ganache está ejecutando en una cadena diferente
    },
    // LocalhostGanache:{
    //   url: 'HTTP://127.0.0.1:7545' ,
    //   accounts: ['0x4350302b780c4333a3e18d64780d6d82dea50906494a1d6825e8596e61954a43'],
    // }
  solidity: "0.8.6",
  paths:{
    artifacts: "./artifacts",
    sources: "./contracts",
    cache: "./cache",
    tests :"./tests"
  },
  networks: {
    ganache:{
      url: "HTTP://127.0.0.1:7545"
    }
  }


};
