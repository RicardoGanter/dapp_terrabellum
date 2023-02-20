import Head from "next/head";
import styles from "../src/styles/Home.module.css";
import React, { useEffect } from "react";
import Web3 from "web3";
export default function Home() {
    useEffect(() => {
      // Web3 Browswer Detection
      if (typeof window.ethereum !== "undefined") {
        console.log("Injected Web3 Wallet is installed!");
      }
  
      //Button ID
      const connectButton = document.getElementById("connect");
  
      //Click Event
      connectButton.addEventListener("click", () => {
        connectAccount();
      });
  
      //Connect Account Function
      async function connectAccount() {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        connectButton.innerHTML =
          account[0] +
          account[1] +
          account[2] +
          account[3] +
          account[4] +
          account[5] +
          "..." +
          account[38] +
          account[39] +
          account[40] +
          account[41];
      }
    }, []);
  
    return (
        <button className={styles.connect} id="connect">
          Connect Wallet
        </button>
    );
  }