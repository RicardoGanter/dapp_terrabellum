import Web3 from 'web3';
export async function connectToMetaMask() {
  if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    const web3 = new Web3(window.ethereum);
    const chainId = await window.ethereum.request({ method: 'eth_chainId', params: ['0x5'] }); // Obtener el chainId actual
    if (chainId === '0x5') { // Comprobar si ya está conectado a Goerli
      const account = await web3.eth.accounts[0]
      console.log(`Connected to chain ${chainId}, address ${account}`);
      return localStorage.setItem('address', account);
    } else { // Si no está conectado a Goerli, mostrar un mensaje y permitir al usuario cambiar la red
      // alert('Por favor, cambie a la red de Goerli en MetaMask');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }],
      });
      return await connectToMetaMask(); // Volver a llamar a la función para asegurarse de que esté conectado a Goerli
    }
  } else {
    throw new Error('MetaMask not found');
  }
}