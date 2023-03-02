import Web3 from 'web3';

export async function connectToMetaMask() {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    const chainId = await window.ethereum.request({ method: 'eth_chainId', params: ['0x5'] });
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    console.log(`Connected to chain ${chainId}, address ${address}`);
    return web3;
  } else {
    throw new Error('MetaMask not found');
  }
}