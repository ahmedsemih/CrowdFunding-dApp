import { Card } from "@/components";
import connectBlockchain from "@/utils/connectBlockchain";
import React from "react";

const fetchCampaignsByUser = async (address) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/campaigns?owner=${address}`,
    { method: "GET", cache: "no-cache" }
  );
  const data = await res.json();

  const totalCollected = data.campaigns.reduce(
    (acc, campaign) => acc + Number(campaign.collectedAmount),
    0
  );
  const totalWithdrawn = data.campaigns.reduce(
    (acc, campaign) => acc + Number(campaign.withdrawnAmount),
    0
  );

  return { campaigns: data.campaigns, totalCollected, totalWithdrawn };
};

const Account = async () => {
  const { signer } = connectBlockchain();
  const { campaigns, totalCollected, totalWithdrawn } = await fetchCampaignsByUser(signer.address);

  return (
    <main>
      <div className="bg-neutral-800 rounded-lg w-full p-4">
        <h1 className="text-2xl font-semibold">Account</h1>
        <div className="flex flex-col my-4">
          <span className="text-neutral-400">Address:</span>
          <span className="text-neutral-300 truncate">{signer.address}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-neutral-400">Number of Campaigns:</span>
            <span className="text-neutral-300">{campaigns?.length ?? 0}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-neutral-400">Total Collected:</span>
            <span className="text-neutral-300">{totalCollected ?? 0}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-neutral-400">Total Withdrawn:</span>
            <span className="text-neutral-300">{totalWithdrawn ?? 0}</span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {campaigns?.length === 0 ? (
          <div className="flex flex-col  justify-center gap-4 mt-10">
            <h1 className="text-xl">No Campaigns Found</h1>
            <p className="text-lg text-neutral-400">
              Newly created campaigns may not appear immediately.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 mt-8">
              <h1 className="text-xl">
                Your Campaigns ({campaigns?.length ?? 0})
              </h1>
              <p className="text-lg text-neutral-400">
                Newly created campaigns may not appear immediately.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {campaigns?.map((campaign) => (
                <Card campaign={campaign} key={campaign.id} user={signer.address} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Account;
