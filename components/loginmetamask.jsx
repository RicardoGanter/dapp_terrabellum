import styles from "../src/styles/Home.module.scss";
import { useState, useEffect } from 'react';
import {connectToMetaMask} from './funcion/loginmetamask'
export default function ConnectButton() {
  const [address, setAddress] = useState('');

  useEffect(() => {
    const storedAddress = localStorage.getItem('address');
    if (storedAddress) {
      setAddress(storedAddress);
    }
  }, []);

  async function handleClick() {
    const web3 = await connectToMetaMask();
    const accounts = await web3.eth.getAccounts();
    console.log(accounts)
    setAddress(accounts[0]);
    localStorage.setItem('address', accounts[0]);
  }
  function handleDisconnect() {
    setAddress('');
    localStorage.removeItem('address');
  }
  if (address) {
    return (<><p>{address}</p>
    <button onClick={handleDisconnect} style={{cursor:"pointer", margin:"0 1rem", padding:".8rem", backgroundColor:"white", borderRadius:"0 1rem 1rem 0"}}>Disconnect</button>
    </>
    )
  } else {
    return <button onClick={handleClick} style={{cursor:"pointer", margin:"0 1rem", padding:".8rem", backgroundColor:"white", borderRadius:"0 1rem 1rem 0"}}>Connect</button>;
  }
}

export function getStoredAddress() {
  return localStorage.getItem('address');
}