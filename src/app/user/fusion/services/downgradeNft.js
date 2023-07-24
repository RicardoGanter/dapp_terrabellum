import ConnectInnomicNft from "../../../../components/funcion/connectinnomicnft" 

const downgradeNft = async ( id ) =>{
    const contract = await ConnectInnomicNft()
    await contract.downgrade(id) 
} 

export default downgradeNft