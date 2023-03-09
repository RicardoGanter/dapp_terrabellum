async function main() {
    const Contract = await ethers.getContractFactory("Marketplace");
    const contract = await Contract.deploy()
    const addreses = await contract.address;
    console.log("contrato: ",addreses)
    await contract.deployed();
    console.log("fue deployado :o")
    }

//0x9bFfE512fa1595728f8dDCD8b5c9C59fcAF7056F
    main()