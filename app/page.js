'use client';
import { useState, useEffect } from "react";
import "./css/main.css";
import Navigation from "./components/Navigation.js";
const { create_new_user } = "components/kwil.js"


export default function Home() {

  useEffect(() => {
    localStorage.setItem("walletAddress", "");
  }, []);


  const [walletAddress, setWalletAddress] = useState("");

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
      localStorage.setItem("walletAddress", accounts[0]);

      //alert(`Wallet Connected: ${accounts[0]}`);
      console.log("Wallet Address:" + accounts[0]);
      //console.log("Wallet Address:" + walletAddress);



    }
    catch (err) {
      console.error("Error connecting to MetaMask:", err.message);
      alert("Failed to connect wallet. Please try again.");
    }
  };

  /**
   * Disconnects the wallet by clearing the wallet address state.
   * Logs a message indicating the wallet has been disconnected.
   */

  const disConnectWallet = () => {

    setWalletAddress("");
    localStorage.setItem("walletAddress", "");
    console.log("Wallet Disconnected");
    return;
  };

  // function walletConnected() {
  //   if (walletAddress) { return true };
  //   if (localStorage.getItem("walletAddress")) { return true };
  //   return false;
  // }

  const wnConnectedBtn = () => {
    alert('Wallet Not Connected')
  };

  return (
    <>
      <Navigation address={localStorage.getItem("walletAddress") ? localStorage.getItem("walletAddress") : ""} />
      <div className="main">
        <img className="logo" src="/images/sg.png" alt="logo" />
        <div className="wallet">
          <button
            onClick={localStorage.getItem("walletAddress") ? disConnectWallet : connectWallet}
            className={"btn btn-outline btn-secondary"}
          >
            {localStorage.getItem("walletAddress") ? "Disconnect Wallet" : "Connect Wallet"}
          </button>
        </div>
        <div className="tasks">
          <h1 className="headingBase">{walletAddress ? <a href="tasks" className={"btn btn-outline btn-success"}>ToDo Dapp</a> : <button onClick={wnConnectedBtn} className={"btn btn-outline btn-alert"}>Wallet Not Connected</button>}</h1>
        </div>
      </div>

    </>
  );
};
