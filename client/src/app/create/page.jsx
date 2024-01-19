"use client";

import { ethers } from "ethers";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { FaEthereum } from "react-icons/fa";

import { ClientButton, FormInput } from "@/components";
import { useEthersContext } from "@/contexts/EthersContext";
import { toast } from "react-toastify";

const Create = () => {
  const router = useRouter();
  const { signer, contract, connectWallet } = useEthersContext();

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    imageUrl: "",
    target: "",
    deadline: "",
  });

  const handleFormInputChange = (field, event) => {
    setFormValues({ ...formValues, [field]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formValues.title ||
      !formValues.description ||
      !formValues.imageUrl ||
      !formValues.target ||
      !formValues.deadline
    )
      return toast.error("Please fill all the fields");

    if (!signer) return connectWallet();
    
    try {
      setLoading(true);
  
      const { title, description, imageUrl } = formValues;
      const target = ethers.parseUnits(formValues.target, 18).toString();
      const deadline = new Date(formValues.deadline).getTime();

      await contract.createCampaign(
        title,
        description,
        imageUrl,
        target,
        deadline,
        { gasLimit: 1000000 }
      );
      
      toast.success("Campaign created successfully.");
      handleReset();

      setTimeout(() => {
        return router.push('/account');
      }, 2000);
    } catch (error) {
      toast.error("Campaign couldn't be created.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormValues({
      title: "",
      description: "",
      imageUrl: "",
      target: "",
      deadline: "",
    });
  };

  return (
    <main className="w-full bg-neutral-800 rounded-lg min-h-[calc(100vh-96px)]">
      <div className="m-auto w-content flex justify-center items-center p-4">
        <h1 className="bg-neutral-700 py-4 px-8 text-2xl font-semibold rounded-lg text-center w-content mx-auto">
          Start a Campaign
        </h1>
      </div>
      <form
        className="p-4 flex flex-col gap-4 min-h-[calc(100vh-192px)]"
        onSubmit={handleSubmit}
      >
        <div className="flex-col flex md:flex-row gap-4">
          <FormInput
            label={"Campaign Title"}
            placeholder={"Write a title..."}
            type={"text"}
            value={formValues.title}
            onChange={(e) => handleFormInputChange("title", e)}
          />
          <FormInput
            label={"Image URL"}
            placeholder={"Paste campaign image URL here..."}
            type={"text"}
            value={formValues.imageUrl}
            onChange={(e) => handleFormInputChange("imageUrl", e)}
          />
        </div>
        <FormInput
          label={"Story"}
          placeholder={"Write why you need this money..."}
          type={"textarea"}
          value={formValues.description}
          onChange={(e) => handleFormInputChange("description", e)}
        />
        <div className="flex items-center justify-around gap-4 bg-emerald-500 p-4 md:p-8 rounded-lg text-emerald-300">
          <FaEthereum className="text-5xl" />
          <span className="text-lg sm:text-xl md:text-2xl font-semibold">
            You will get 99% of the raised amount
          </span>
          <FaEthereum className="text-5xl" />
        </div>
        <div className="flex-col flex md:flex-row gap-4">
          <FormInput
            label={"Goal (ETH)"}
            placeholder={"Write your goal amount..."}
            type={"number"}
            value={formValues.target}
            onChange={(e) => handleFormInputChange("target", e)}
          />
          <FormInput
            label={"Deadline"}
            placeholder={"Pick a deadline..."}
            type={"date"}
            value={formValues.deadline}
            onChange={(e) => handleFormInputChange("deadline", e)}
          />
        </div>
        <div className="flex justify-end gap-4 mt-auto">
          <ClientButton
            loading={loading}
            className="w-28 bg-emerald-500 border-2 border-emerald-500 hover:border-emerald-600 hover:bg-emerald-600 transition-all duration-200 p-3 rounded-lg font-semibold"
            onClick={handleSubmit}
            type="submit"
          >
            Create
          </ClientButton>
          <ClientButton
            className="w-28 bg-transparent border-2 text-emerald-500 hover:text-white border-emerald-500 hover:border-emerald-600 hover:bg-emerald-600 transition-all duration-200 p-3 rounded-lg font-semibold"
            onClick={handleReset}
          >
            Reset
          </ClientButton>
        </div>
      </form>
    </main>
  );
};

export default Create;
