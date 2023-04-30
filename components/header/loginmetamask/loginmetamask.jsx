"use client"
import { useState, useEffect } from 'react';
import {connectToMetaMask} from '../../funcion/loginmetamask'
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
  function getStoredAddress() {
    if (address) {
      return localStorage.getItem('address');
    }
  }
  function handleDisconnect() {
    setAddress('');
    localStorage.removeItem('address');
  }
  if (address) {
    return (<><p>{address}</p>
    <button onClick={handleDisconnect}>Disconnect</button>
    </>
    )
  } else {
    return <button onClick={handleClick}>Connect</button>;
  }
}

