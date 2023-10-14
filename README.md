https://github.com/ahmedsemih/CrowdFunding-Dapp/assets/102798814/b9edc7be-7ecb-4728-8243-bdbf77002838

# CrowdFunding Dapp

This is a decentralized crowdfunding application with NextJS and Solidity. In this dapp peoples can create campaigns or donate to them.

## :bulb: Features

- Dark Theme
- Responsive UI
- Wallet Authentication
- Create Campaign
- Donate or Withdraw Ethereum
- Decentralized

## :hammer_and_wrench: Built With

- [Solidity](https://soliditylang.org/) - Smart Contract Language
- [React](https://reactjs.org/) - JavaScript library for UI
- [NextJS](https://nextjs.org/) - React Framework
- [TailwindCSS](https://tailwindcss.com/) - CSS Framework
- [Hardhat](https://hardhat.org/) Ethereum Development Environment
- [Waffle](https://ethereum-waffle.readthedocs.io/en/latest/) Smart Contract Test Library
- [Ethers](https://docs.ethers.org/v5/) Smart Contract Interaction Library
- [React Icons](https://react-icons.github.io/react-icons/) - Icon Library


## :camera_flash: Screenshots
![cf-ss-1](https://github.com/ahmedsemih/CrowdFunding-Dapp/assets/102798814/678b0929-be1c-4d20-bc60-30ae9ec65ad2)
![cf-ss-2](https://github.com/ahmedsemih/CrowdFunding-Dapp/assets/102798814/f641d0c4-fbd1-4746-b161-70891d0f1df1)
![cf-ss-3](https://github.com/ahmedsemih/CrowdFunding-Dapp/assets/102798814/e5048589-5967-4827-8e6f-afb2e2b5524c)
![cf-ss-4](https://github.com/ahmedsemih/CrowdFunding-Dapp/assets/102798814/cf6a52f3-db16-4c90-993b-ee083b11d51b)
![cf-ss-5](https://github.com/ahmedsemih/CrowdFunding-Dapp/assets/102798814/93642aba-c005-4093-9efb-78584cd2eb96)
![cf-ss-6](https://github.com/ahmedsemih/CrowdFunding-Dapp/assets/102798814/00a569de-726b-4c27-ba21-54518af17f6f)

## :triangular_flag_on_post: Getting Started

First of all you need to clone the repository and install the dependencies

```shell

git clone https://github.com/ahmedsemih/fullstack-chat-app.git
cd client
npm install
cd ..
cd smart-contract
npm install

```

After doing this you must assign the following environment variables

```shell

--- CLIENT ---
NEXT_PUBLIC_API_BASE_URL
NEXT_PUBLIC_PROVIDER_URL
NEXT_PUBLIC_CONTRACT_ADDRESS
NEXT_PUBLIC_PRIVATE_KEY

--- SMART CONTRACT ---
ACCOUNT_PRIVATE_KEY
PROJECT_ID

```

And deploy your smart contract then run your client

```shell

--- SMART CONTRACT ---
npx hardhat run scripts/deploy.js

--- CLIENT ---
npm run dev

```
