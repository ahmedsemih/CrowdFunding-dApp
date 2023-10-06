"use client";

import Cookie from "js-cookie";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { createContext, useContext, useEffect, useState } from "react";

import contractABI from "@/utils/contractABI";

const EthersContext = createContext();

export const EthersProvider = ({ children }) => {
  const [signer, setSigner] = useState(null);
  const [loading, setLoading] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initEthers = async () => {
      if(!Cookie.get("isAllowed")){
        setLoading(true)

        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contractInstance = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
          contractABI,
          provider
        );

        setLoading(false);
        return setContract(contractInstance);
      }
      
      connectWallet();
    };

    window.ethereum !== undefined && initEthers();
  }, []);

  const connectWallet = async () => {
    setLoading(true);

    if (window.ethereum !== undefined) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const connectedProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await connectedProvider.getSigner();
      const contractInstance = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        contractABI,
        signer
      );

      setSigner(signer);
      setProvider(provider);
      setContract(contractInstance);
      Cookie.set("isAllowed", true);
    } else {
      toast.error("Please install Metamask to continue.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        width: "1000px",
      });
    }

    setLoading(false);
  };

  const disconnectWallet = () => {
    setSigner(null);
    Cookie.remove("isAllowed");
  };

  const values = {
    signer,
    loading,
    contract,
    provider,
    connectWallet,
    disconnectWallet,
  };

  return (
    <EthersContext.Provider value={values}>{children}</EthersContext.Provider>
  );
};

export const useEthersContext = () => useContext(EthersContext);
