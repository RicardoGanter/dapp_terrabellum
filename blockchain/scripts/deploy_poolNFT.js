async function main() {
    const Contract = await ethers.getContractFactory("PoolNFT");
    const contract = await Contract.deploy("0x065c2a2966d9dE9c1da80d5767287493411014eE")
    const addreses = await contract.address;
    console.log("contrato: ",addreses)
    await contract.deployed();
    console.log("fue deployado :o")
    }
    // 0x0D005cD227Fbeb72939172A5214cd64DE043c410

    main()