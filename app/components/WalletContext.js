import { createContext, useContext, useState } from "react";

// Create the context
const WalletContext = createContext();

// Custom hook to use the WalletContext
export const useWallet = () => useContext(WalletContext);

// Provide the context
export const WalletProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState("");

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("MetaMask is not installed. Please install it to use this feature.");
            return;
        }

        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setWalletAddress(accounts[0]);
            alert(`Wallet Connected: ${accounts[0]}`);
        } catch (err) {
            console.error("Error connecting to MetaMask:", err.message);
            alert("Failed to connect wallet. Please try again.");
        }
    };

    const disconnectWallet = () => {
        setWalletAddress("");
        alert("Wallet Disconnected");
    };

    return (
        <WalletContext.Provider
            value={{
                walletAddress,
                connectWallet,
                disconnectWallet,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};
