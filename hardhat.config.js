/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
const ALCHEMY_API_KEY = "gIYahKEbCs9lj1MRp6mwlzYHxonY3hYL";
const GOERLI_PRIVATE_KEY = "af28d50f35dff3890a623374f65656227d9c7b92d9fee07ffa398657047c5ebd";
// const GOERLI_PRIVATE_KEY = "a43171098a3ea626a1e63f45a1ad72adedf9e162efbffdbe065aaaa7a62c4cb4";
const INFURA_API_KEY = "f8191b77762f407da099f89c34a57514"


module.exports = {
  // ganache: {
  //     url: "http://localhost:7545", // Cambia el puerto si ganache está ejecutando en un puerto diferente
  //     chainId: 1337, // Cambia este valor si ganache está ejecutando en una cadena diferente
  //   },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
  paths:{
    artifacts: "./artifacts",
    sources: "./contracts",
    cache: "./cache",
    tests :"./tests"
  },
  networks: {
    // ganache:{
    //   url: "HTTP://127.0.0.1:7545"
    // },
    goerliAlchemy: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
      gasPrice: 40000000000,
      gas: 1000000000,
      gasLimit:100000000000,
      chainId: 5,
  },
  goerliInfura: {
    url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
    // accounts: [`0x${GOERLI_PRIVATE_KEY}`],
    // accounts: {
    //   privateKey: "0xaf28d50f35dff3890a623374f65656227d9c7b92d9fee07ffa398657047c5ebd"
    // },
    // accounts: {
    //   mnemonic: "finger mule virus ugly plug flip unfair scene clog nothing trophy proof",
    // },
    gasPrice: 40000000000,
    gas: 1000000000,
    chainId: 5,
}
  }
};
