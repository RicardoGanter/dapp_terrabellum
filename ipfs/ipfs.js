import IPFS from 'ipfs-http-client'

const DataIpfs= ()=>{
const ipfs = IPFS({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
const getFileFromIPFS = async (cid) => {
    const content = await ipfs.cat(cid)
    return content.toString()
  }

}
export default DataIpfs
// const stream = node.cat('QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A')
// const decoder = new TextDecoder()
// let data = ''

// for  (const chunk of stream) {
//   // chunks of data are returned as a Uint8Array, convert it back to a string
//   data += decoder.decode(chunk, { stream: true })
// }

// console.log(data)