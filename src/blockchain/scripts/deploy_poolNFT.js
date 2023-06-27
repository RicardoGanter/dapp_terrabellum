async function main() {
    const Contract = await ethers.getContractFactory("PoolNFT");
    const contract = await Contract.deploy("0x436Af34eBF3085cE92780c853e429d29A2CE4AA1")
    const addreses = await contract.address;
    console.log("contrato: ",addreses)
    await contract.deployed();
    console.log("fue deployado :o")
    }
    // 0xE9375787363239b3Ab08c4341B94E8Efd9471CbD

    main()