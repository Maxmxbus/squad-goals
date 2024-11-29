"use client";
import { useState } from "react";
import "./css/main.css";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");

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
      alert(`Wallet Connected: ${accounts[0]}`);
      console.log("Wallet Address:", accounts[0]);
    } catch (err) {
      console.error("Error connecting to MetaMask:", err.message);
      alert("Failed to connect wallet. Please try again.");
    }
  };

  const disConnectWallet = () => {
    setWalletAddress("");
    alert("Wallet Disconnected");
  };

  return (
    <>
      <div className="main">
        <img className="logo" src="/images/sg.png" alt="logo" />
        <div className="wallet">
          <button
            onClick={walletAddress ? disConnectWallet : connectWallet}
            className={"btn btn-outline btn-secondary"}
          >
            {walletAddress ? "Disconnect Wallet" : "Connect Wallet"}
          </button>
        </div>
        <div className="createSquad">
          <input
            type="text"
            placeholder="Enter Squad Name"
            className="input input-bordered input-secondary w-full max-w-xs"
          />
          <button className="btn btn-accent">Create Squad</button>
        </div>

        <div className="joinSquad">
          <input
            type="text"
            placeholder="Enter Squad Id"
            className="input input-bordered input-secondary w-full max-w-xs"
          />
          <button className="btn btn-accent">Join Squad</button>
        </div>
      </div>
    </>
  );
}
