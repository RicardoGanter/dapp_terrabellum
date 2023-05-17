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
    await connectToMetaMask();
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
    <button style={{margin :"0 auto", width:"100%"}} onClick={()=>handleDisconnect()}>Disconnect</button>
    </>
    )
  } else {
    return <button style={{margin :"0 auto", width:"100%"}} onClick={()=>handleClick()}>Sign in with Wallet </button>;
  }
}

