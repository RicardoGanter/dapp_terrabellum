async function main() {
    const Contract = await ethers.getContractFactory("PoolNFT");
    const contract = await Contract.deploy("0x7751611Ef1581b7487AC92a5d3450233cB1B7007")
    const addreses = await contract.address;
    console.log("contrato: ",addreses)
    await contract.deployed();
    console.log("fue deployado :o")
    }
    // 0x980626E546fbbfD987a767dAb84a0a4440f84cEa

    main()