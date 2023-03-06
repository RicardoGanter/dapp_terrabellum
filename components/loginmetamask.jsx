import Head from "next/head";
import styles from "../src/styles/Home.module.scss";
import { useState, useEffect } from 'react';

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
    setAddress(accounts[0]);
    localStorage.setItem('address', accounts[0]);
  }

  if (address) {
    return <p>Connected with address: {address}</p>;
  } else {
    return <button onClick={handleClick}>Connect to MetaMask</button>;
  }
}

export function getStoredAddress() {
  return localStorage.getItem('address');
}