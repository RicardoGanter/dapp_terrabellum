async function main() {
    const Contract = await ethers.getContractFactory("PoolNFT");
    const contract = await Contract.deploy("0x93a6B40Ff6101246b1eE6BAD63DeC48d41E2786f")
    const addreses = await contract.address;
    console.log("contrato: ",addreses)
    await contract.deployed();
    console.log("fue deployado :o")
    }
    // 0x400c7eEfAeb3e981Db9E9a62FC5c9A2b97C4EB00

    main()