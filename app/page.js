'use client';
import { useState } from "react";
import "./css/main.css";



export default function Home() {
  const [walletAddress, setWalletAddress] = useState('');

  //Connect Wallet function
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install it to use this feature.");
      return;
    }


    try {
      // Request account access from the user
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Set the first account to walletAddress state

      setWalletAddress(accounts[0]);
      JSON.stringify(localStorage.setItem('walletAddress', accounts[0]));
      console.log(localStorage);
      alert(`Wallet Connected: ${accounts[0]}`);
      // console.log("Wallet Address:", accounts[0]);
    } catch (err) {
      console.error("Error connecting to MetaMask:", err.message);
      alert("Failed to connect wallet. Please try again.");
    }
  };

  const disConnectWallet = () => {
    localStorage.removeItem("walletAddress");
    setWalletAddress("");
    console.log("Wallet Disconnected");
    return;
  };

  function walletConnected() {
    if (walletAddress) { return true };
    if (localStorage.getItem("walletAddress")) { return true };
    return false;
  }

  const wnConnectedBtn = () => { alert('Wallet Not Connected') };

  return (
    <>
      <div className="main">
        <img className="logo" src="/images/sg.png" alt="logo" />
        <div className="wallet">
          <button
            onClick={walletAddress ? disConnectWallet : connectWallet}
            className={"btn btn-outline btn-secondary"}
          >
            {walletConnected() ? "Disconnect Wallet" : "Connect Wallet"}
          </button>
        </div>
        <div className="tasks">
          <h1 className="headingBase">{walletConnected() ? <a href="tasks">Squad Goals</a> : <button onClick={wnConnectedBtn}>Wallet Not Connected</button>}</h1>
        </div>
      </div>

    </>
  );
};
