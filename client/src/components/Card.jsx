"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Logo from "../../public/Logo.png";
import getDaysLeft from "@/utils/getDaysLeft";
import { useEthersContext } from "@/contexts/EthersContext";
import { AlertModal, ClientButton, WithdrawModal } from ".";

const Card = ({ campaign, user }) => {
  const router = useRouter();
  const { setSelectedCampaign } = useEthersContext();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const handleClickCard = () => {
    if (isAlertOpen || isWithdrawOpen) return;

    setSelectedCampaign(campaign);
    const title = campaign.title.replace(/\s/g, "-").toLowerCase();
    return router.push(`/campaigns/${title}`);
  };

  const handleClickButton = (e, type) => {
    e.stopPropagation();

    if (type === "withdraw") setIsWithdrawOpen(true);
    else setIsAlertOpen(true);
  };

  return (
    <div
      onClick={handleClickCard}
      className="w-full cursor-pointer bg-neutral-800 rounded-lg"
    >
      <img
        className="w-full rounded-lg h-[210px] md:h-[200px] xl:h-[264px]"
        loading="lazy"
        src={campaign.imageUrl}
        alt={campaign.title}
        width={500}
        height={250}
      />
      <div className="p-2 sm:p-4">
        <h5 className="text-xl py-1 truncate">{campaign.title}</h5>
        <p className="truncate pb-4 text-neutral-400">{campaign.description}</p>
        <div className="flex justify-between pb-4 gap-4">
          <div className="flex flex-col overflow-hidden">
            <span className="text-neutral-300">{campaign.collectedAmount}</span>
            <span className="text-neutral-400 truncate">
              Raised of {campaign.target}
            </span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-neutral-300">
              {getDaysLeft(campaign.deadline) > 0
                ? getDaysLeft(campaign.deadline)
                : "Ended"}
            </span>
            <span className="text-neutral-400">
              {getDaysLeft(campaign.deadline) > 0 ? "Days Left" : "Campaign"}
            </span>
          </div>
        </div>
        {user === campaign.owner && getDaysLeft(campaign.deadline) > 0 ? (
          <div className="sm:mt-4 mt-2 flex gap-3 font-semibold">
            <ClientButton
              onClick={(e) => handleClickButton(e, "withdraw")}
              className="bg-emerald-500 rounded-lg border-2 border-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 transition-all duration-200 w-full p-2"
            >
              Withdraw
            </ClientButton>
            <ClientButton
              onClick={(e) => handleClickButton(e, "end")}
              className="bg-transparent text-emerald-500 rounded-lg border-2 border-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 hover:text-neutral-200 transition-all duration-200 w-full p-2"
            >
              End
            </ClientButton>
          </div>
        ) : (
          <div className="flex items-center">
            <Image
              className="bg-neutral-900 rounded-full mr-2 p-2"
              src={Logo}
              alt="logo"
              width={36}
              height={36}
            />
            <p className="text-sm truncate">
              <span className="text-neutral-400 mr-1">by</span> {campaign.owner}
            </p>
          </div>
        )}
        {isAlertOpen && (
          <AlertModal setIsOpen={setIsAlertOpen} campaignId={campaign.id} />
        )}
        {isWithdrawOpen && (
          <WithdrawModal
            setIsOpen={setIsWithdrawOpen}
            campaignId={campaign.id}
            totalCollected={campaign.collectedAmount}
            totalWithdrawn={campaign.withdrawedAmount}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
