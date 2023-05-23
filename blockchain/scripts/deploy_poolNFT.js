async function main() {
    const Contract = await ethers.getContractFactory("PoolNFT");
    const contract = await Contract.deploy("0x8bfB2836697F6D2bb4e2133fF876A24e693B4e2d")
    const addreses = await contract.address;
    console.log("contrato: ",addreses)
    await contract.deployed();
    console.log("fue deployado :o")
    }
    // 0xb4832452437f8Cce3796C959C93e218E5fD794F5

    main()