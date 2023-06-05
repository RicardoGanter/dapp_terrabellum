/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");

// SEPOLIA
const SEPOLIA_PRIVATE_KEY = "39aad856cd1eee56fc2f94c754e853ef353feccff38ad57176869d7c5784ff23"
const SEPOLIA_API_KEY = "6FBaabNdtIXtCvmVyrai6H_TpdX6MYQB"

//mumbaialchemy
const MUMBAI_API_KEY = "dEniHEulCNQyZOPDY3FbGt7zJnLYwB2B"

//INFURA
const IFURA_SEPOLIA_PRIVATE_KEY = "39aad856cd1eee56fc2f94c754e853ef353feccff38ad57176869d7c5784ff23"
const INFURA_SEPOLIA_API_KEY = "6FBaabNdtIXtCvmVyrai6H_TpdX6MYQB"


const ALCHEMY_API_KEY = "gIYahKEbCs9lj1MRp6mwlzYHxonY3hYL";

// const GOERLI_PRIVATE_KEY = "a43171098a3ea626a1e63f45a1ad72adedf9e162efbffdbe065aaaa7a62c4cb4";
const INFURA_API_KEY = "d9ba4d2b8d794e18a15c785b06d171ca"
const GOERLI_PRIVATE_KEY = "af28d50f35dff3890a623374f65656227d9c7b92d9fee07ffa398657047c5ebd";


module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 500
      }
    }
  },
  paths:{
    artifacts: "./blockchain/artifacts",
    sources: "./blockchain/contracts",
    cache: "./blockchain/cache",
    tests :"./blockchain/tests"
  },
  networks: {
    // ganache:{
    //   url: "HTTP://127.0.0.1:7545"
    // },
    maticmumbaiAlchemy:{
      url: `https://polygon-mumbai.g.alchemy.com/v2/${MUMBAI_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
      gasPrice: 40000000000,
      gas: 1000000000,
      gasLimit:100000000000,
      chainId: 5,
    },
    goerliAlchemy: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
      gasPrice: 40000000000,
      gas: 1000000000,
      gasLimit:100000000000,
      chainId: 5,
  },
  sepoliaInfura: {
    url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
      gasPrice: 90000000000,
      gas: 44000000000,
      gasLimit:8700000000000000,
      chainId: 11155111,
}
  }
};
