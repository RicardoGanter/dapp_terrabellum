async function main() {
    const Contract = await ethers.getContractFactory("NFTMarketplace");
    const contract = await Contract.deploy("0x0Bc916E4DD112d7Ab395b2E669100A827203DD51")
    const addreses = await contract.address;
    console.log("contrato: ",addreses)
    await contract.deployed();
    console.log("fue deployado :o")
    }

//0xc832E42E913094E5eeB874f18CFC7591b688F76C
    main()