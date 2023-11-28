"use client";

import Image from "next/image";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEthereum } from "react-icons/fa";

import getDaysLeft from "@/utils/getDaysLeft";
import Logo from "../../../../public/Logo.png";
import { ClientButton, FormInput } from "@/components";
import { useEthersContext } from "@/contexts/EthersContext";

const CampaignDetails = () => {
  const router = useRouter();
  const { selectedCampaign: campaign, contract } = useEthersContext();
  const [amount, setAmount] = useState(0);
  const [topDonations, setTopDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (campaign === null) return router.back();

    campaign.donations.sort((a, b) => b.amount - a.amount);
    const tops = campaign.donations.slice(0, 10);
    setTopDonations(tops);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(amount === 0) return toast.error("Please enter an amount");
    if(getDaysLeft(campaign.deadline) <= 0) return toast.error("Campaign has ended");

    setLoading(true);

    try {
      await contract.donate(campaign.id, {
        value: ethers.parseEther(amount),
        gasLimit: 1000000,
      });

      toast.success("Donation Successful!");
    } catch (error) {
      toast.error("Donation Failed!");
    }

    setAmount(0);
    setLoading(false);
  };

  return (
    <main>
      <div className="flex gap-4 md:flex-row flex-col">
        <div className="w-full h-full max-h-[300px] md:max-h-none md:h-[400px] xl:h-[500px]">
          <img
            className="rounded-lg w-full object-cover h-full max-h-[300px] md:max-h-none"
            src={campaign?.imageUrl}
            alt={campaign?.title}
            width={1400}
            height={800}
          />
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col justify-between gap-4">
          <div className="rounded-lg bg-neutral-800 min-w-[124px] w-full">
            <p className="p-4 text-center text-2xl">
              {getDaysLeft(campaign?.deadline) > 0
                ? getDaysLeft(campaign?.deadline)
                : "Ended"}
            </p>
            <p className="bg-neutral-700 w-full rounded-b-lg p-2 text-sm text-neutral-400 text-center">
              {getDaysLeft(campaign?.deadline) > 0 ? "Days Left" : "Status"}
            </p>
          </div>
          <div className="rounded-lg bg-neutral-800 min-w-[124px] w-full">
            <p className="p-4 text-center text-2xl">
              {campaign?.collectedAmount ?? 0}
            </p>
            <p className="bg-neutral-700 w-full rounded-b-lg p-2 text-sm text-neutral-400 text-center">
              Raised of {campaign?.target}
            </p>
          </div>
          <div className="rounded-lg bg-neutral-800 min-w-[124px] w-full">
            <p className="p-4 text-center text-2xl">
              {campaign?.donations?.length ?? 0}
            </p>
            <p className="bg-neutral-700 w-full rounded-b-lg p-2 text-sm text-neutral-400 text-center">
              Donations
            </p>
          </div>
        </div>
      </div>
      <div className={`grid gap-4 ${getDaysLeft(campaign?.deadline) > 0 ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1'}`}>
        <div className="col-span-4 md:col-span-3">
          <div className="mt-8">
            <h4 className="text-xl font-semibold uppercase mb-2">Creator</h4>
            <div className="flex items-center gap-2">
              <Image
                className="p-3 bg-neutral-800 rounded-full"
                src={Logo}
                alt={campaign?.owner}
                width={48}
                height={48}
              />
              <p className="truncate text-neutral-400">{campaign?.owner}</p>
            </div>
          </div>
          <div className="mt-8">
            <h4 className="text-xl font-semibold uppercase mb-2">Story</h4>
            <p className="text-neutral-400">{campaign?.description}</p>
          </div>
          <div className="mt-8">
            <h4 className="text-xl font-semibold uppercase mb-2">
              Top Donations
            </h4>
            <div className="flex flex-col gap-4">
              { 
                topDonations?.length > 0 ? topDonations.map((donation, index) => (
                  <div key={index} className="bg-neutral-800 p-4 rounded-lg">
                    <p className="text-neutral-400 flex items-center gap-2">
                      <FaEthereum className="text-2xl text-emerald-500" />{" "}
                      <b>
                        {donation.amount}{" "}
                        <span className="hidden md:inline">Eth</span>
                      </b>{" "}
                      from <span className="truncate">{donation.donator}</span>
                    </p>
                  </div>
                )) : (
                  <p className="text-neutral-400">No donations yet.</p>
                )
              } 
            </div>
          </div>
        </div>
        {getDaysLeft(campaign?.deadline) > 0 && (
          <div className="col-span-4 md:col-span-1 mt-8">
            <h4 className="text-xl font-semibold uppercase">Fund</h4>
            <form
              onSubmit={handleSubmit}
              className="bg-neutral-800 rounded-lg p-4"
            >
              <FormInput
                label={"Amount"}
                placeholder={"ETH 0.1"}
                type={"number"}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="bg-neutral-900 text-sm rounded-lg p-2 my-4">
                <p>Back it because you believe in it.</p>
                <p className="text-neutral-500 text-sm mt-2">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>
              <ClientButton
                type="submit"
                onClick={handleSubmit}
                className="w-full font-semibold p-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition-all duration-200F"
                loading={loading}
              >
                Fund Campaign
              </ClientButton>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default CampaignDetails;
