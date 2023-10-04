const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CrowdFunding Contract", () => {
  let CrowdFunding;
  let crowdFunding;
  let owner;
  let donor;
  let campaignId;

  const createCampaign = async () => {
    const createCampaignTx = await crowdFunding.createCampaign(
      "Campaign Title",
      "Campaign Description",
      "Campaign Image",
      ethers.parseEther("100"),
      Math.floor(Date.now() / 1000) + 3600
    );

    await createCampaignTx.wait(1);
    return 0;
  }

  beforeEach(async () => {
    [owner, donor] = await ethers.getSigners();
    CrowdFunding = await ethers.getContractFactory("CrowdFunding");
    crowdFunding = await CrowdFunding.deploy();
    await crowdFunding.waitForDeployment();
    campaignId = await createCampaign();
  });

  it("should create a campaign", async () => {
    const campaign = await crowdFunding.campaigns(campaignId);
    expect(campaign.owner).to.equal(owner.address);
    expect(campaign.title).to.equal("Campaign Title");
    expect(campaign.description).to.equal("Campaign Description");
    expect(campaign.imageUrl).to.equal("Campaign Image");
    expect(campaign.target).to.equal(ethers.parseEther("100"));
    expect(campaign.deadline).to.equal(Math.floor(Date.now() / 1000) + 3600);
  });

  it("should donate to a campaign", async () => {
    await crowdFunding.connect(donor).donate(campaignId, { value: ethers.parseEther("100") });
    const campaign = await crowdFunding.campaigns(campaignId);
    expect(campaign.collectedAmount).to.equal(ethers.parseEther("100"));
  });

  it("should close a campaign", async () => {
    await crowdFunding.connect(owner).closeCampaign(campaignId);
    const campaign = await crowdFunding.campaigns(campaignId);
    expect(campaign.deadline).to.be.lte(Math.floor(Date.now()));
  });

  it("should withdraw from a campaign", async () => {
    await crowdFunding.connect(donor).donate(campaignId, { value: ethers.parseEther("50") });
    await crowdFunding.connect(owner).withdraw(campaignId, ethers.parseEther("30"));
    const campaign = await crowdFunding.campaigns(campaignId);
    expect(campaign.withdrawedAmount).to.equal(ethers.parseEther("30"));
  });

  it("should get a list of campaigns", async () => {
    await createCampaign();
    const allCampaigns = await crowdFunding.getCampaigns();
    expect(allCampaigns.length).to.equal(2);
    expect(allCampaigns[0].title).to.equal("Campaign Title");
    expect(allCampaigns[1].title).to.equal("Campaign Title");
  });

  it("should get donations for a campaign", async () => {
    await crowdFunding.connect(donor).donate(campaignId, { value: ethers.parseEther("50") });
    await crowdFunding.connect(donor).donate(campaignId, { value: ethers.parseEther("30") });
    const donations = await crowdFunding.getDonations(campaignId);
    expect(donations.length).to.equal(2);
    expect(donations[0].donator).to.equal(donor.address);
    expect(donations[0].amount).to.equal(ethers.parseEther("50"));
    expect(donations[1].amount).to.equal(ethers.parseEther("30"));
  });
});