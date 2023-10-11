import { ethers } from "ethers";
import { NextResponse } from "next/server";

import connectBlockchain from "@/utils/connectBlockchain";

export async function GET(req) {
  try {
    const { contract } = connectBlockchain();
    let allCampaigns = await contract.getCampaigns();

    const url = new URL(req.url);
    const owner = url.searchParams.get("owner");

    if(owner) 
    allCampaigns = allCampaigns.filter(campaign => campaign.owner === owner);
    
    const parsedCampaigns = allCampaigns.map((campaign, i) => ({
      id: i,
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      imageUrl: campaign.imageUrl,
      target: ethers.formatEther(campaign.target.toString()),
      deadline: Number(campaign.deadline),
      collectedAmount: ethers.formatEther(campaign.collectedAmount.toString()),
      withdrawedAmount: ethers.formatEther(
        campaign.withdrawedAmount.toString()
      ),
      donations: campaign.donations.map((donation) => ({
        donator: donation.donator,
        amount: ethers.formatEther(donation.amount.toString()),
      })),
    }));

    return NextResponse.json({ campaigns: parsedCampaigns }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {},
      { status: 500, statusText: "Somethings went wrong." }
    );
  }
}

export async function POST(req) {
  try {
    const { contract } = connectBlockchain();
    const { title, description, imageUrl, target, deadline } = await req.json();

    await contract.createCampaign(
      title,
      description,
      imageUrl,
      target,
      deadline,
      { gasLimit: 1000000 }
    );

    return NextResponse.json(
      {},
      { status: 201, statusText: "Campaign created successfully." }
    );
  } catch (error) {
    return NextResponse.json(
      {},
      { status: 500, statusText: "Somethings went wrong." }
    );
  }
}
