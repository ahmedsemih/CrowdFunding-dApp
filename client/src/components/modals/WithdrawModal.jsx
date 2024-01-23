"use client";

import { ethers } from "ethers";
import React, { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import { ClientButton, RangeInput } from "..";
import { useEthersContext } from "@/contexts/EthersContext";

const WithdrawModal = ({
  setIsOpen,
  campaignId,
  totalCollected,
  totalWithdrawn,
}) => {
  const modalRef = useRef(null);
  const { contract } = useEthersContext();

  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target))
        setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const handleClick = async (type) => {
    setLoading(true);
    if (type === "withdraw") {
      if (amount <= 0) return toast.error("Please enter a valid amount");

      try {
        await contract.withdraw(campaignId, ethers.parseEther(amount), {
          gasLimit: 1000000,
        });

        toast.success("Withdraw Successful!");
      } catch (error) {
        toast.error("Withdraw Failed!");
      }
    }

    setLoading(false);
    setIsOpen(false);
  };

  return (
    <main className="bg-[rgba(0,0,0,.7)] h-[100vh] flex items-center justify-center w-full fixed z-50 top-0 left-0 p-4">
      <div
        ref={modalRef}
        className="bg-neutral-800 flex sm:block flex-col justify-center sm:justify-normal rounded-lg p-4 sm:p-8 h-full sm:h-auto w-full md:w-2/3 lg:w-1/2 xl:w-1/3 items-center"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col w-full items-center">
            <p className="text-xl">Total Collected</p>
            <p className="text-xl font-semibold text-emerald-500">
              {totalCollected ?? 0} Eth
            </p>
          </div>
          <div className="flex flex-col w-full items-center">
            <p className="text-xl">Total Withdrawn</p>
            <p className="text-xl font-semibold text-emerald-500">
              {totalWithdrawn ?? 0} Eth
            </p>
          </div>
        </div>
        <div className="flex flex-col py-8">
          <p className="text-start text-neutral-500">
            * You can withdraw only{" "}
            {((totalCollected ?? 0) - (totalWithdrawn ?? 0)).toFixed(2)} Eth. *
          </p>
          <RangeInput
            max={(totalCollected ?? 0) - (totalWithdrawn ?? 0)}
            min={0}
            step={0.0001}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-center gap-4 font-semibold">
          <ClientButton
            loading={loading}
            onClick={() => handleClick("withdraw")}
            className="bg-emerald-500 border-2 border-emerald-500 py-2 px-4 rounded-lg hover:border-emerald-600 hover:bg-emerald-600 transition-all duration-200"
          >
            Withdraw
          </ClientButton>
          <ClientButton
            loading={loading}
            onClick={() => handleClick("cancel")}
            className="border-2 border-emerald-500 text-emerald-500 py-2 px-4 rounded-lg hover:border-emerald-600 hover:bg-emerald-600 transition-all duration-200 hover:text-neutral-200"
          >
            Cancel
          </ClientButton>
        </div>
      </div>
    </main>
  );
};

export default WithdrawModal;
