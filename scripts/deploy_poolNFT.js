async function main() {
    const Contract = await ethers.getContractFactory("PoolNFT");
    const contract = await Contract.deploy("0x3B92E898442BEEf2ECB82746AaCC5a353933cb28")
    const addreses = await contract.address;
    console.log("contrato: ",addreses)
    await contract.deployed();
    console.log("fue deployado :o")
    }
    // 0xF519F225640592Cd3824cB77e81C810FB577bcec

    main()