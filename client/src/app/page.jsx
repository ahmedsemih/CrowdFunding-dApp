import Image from "next/image";

import { Card } from "@/components";
import Logo from "../../public/Logo.png";

const fetchCampaigns = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/campaigns`, {
    method: "GET",
    cache: "no-cache",
  });
  const data = await res.json();
  var campaigns = data.campaigns;

  if (!campaigns) campaigns = [];

  campaigns.sort((a, b) => b.collectedAmount - a.collectedAmount);
  
  const tops = campaigns.slice(0, 9);
  const donationCount = campaigns.reduce(
    (total, campaign) => total + campaign.donations.length,
    0
  );

  return { campaigns: tops, donationCount, campaignCount: campaigns.length };
};

const fetchTotalCollected = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/total`, {
    method: "GET",
    cache: "no-cache",
  });
  const data = await res.json();
  return data.total || 0;
};

const Home = async () => {
  const totalCollected = await fetchTotalCollected();
  const { campaigns, campaignCount, donationCount } = await fetchCampaigns();

  return (
    <div>
      <div className="bg-neutral-800 rounded-lg p-4 md:p-8 w-full mb-8">
        <div className="flex">
          <div>
            <div className="flex items-end gap-4">
              <Image
                className="hidden md:block"
                src={Logo}
                alt="fundseed"
                width={50}
                height={50}
              />
              <h1 className="text-2xl md:text-4xl font-semibold">
                Welcome to Fund Seed
              </h1>
            </div>
            <p className="text-sm md:text-lg text-neutral-400 mb-8 mt-4">
              Fund Seed is a decentralized crowdfunding platform built on
              Ethereum. It allows anyone to create a campaign and raise funds.
              What we have achieved so far:
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="bg-neutral-700 rounded-lg p-4 w-full">
            <h5 className="text-center mb-2">All Campaigns</h5>
            <p className="text-2xl font-semibold text-center">
              {campaignCount}
            </p>
          </div>
          <div className="bg-neutral-700 rounded-lg p-4 w-full">
            <h5 className="text-center mb-2">Total Donations</h5>
            <p className="text-2xl font-semibold text-center">
              {donationCount}
            </p>
          </div>
          <div className="bg-neutral-700 rounded-lg p-4 w-full">
            <h5 className="text-center mb-2">Collected Eth</h5>
            <p className="text-2xl font-semibold text-center">
              {totalCollected}
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-xl mb-4">Most Popular Campaigns</h1>
      {campaigns?.length === 0 ? (
        <div className="flex flex-col  justify-center gap-4 mt-10">
          <h1 className="text-4xl font-semibold">No Campaigns Found</h1>
          <p className="text-lg text-neutral-400">
            It looks like there are no campaigns created yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {campaigns?.map((campaign) => (
            <Card campaign={campaign} key={campaign.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
