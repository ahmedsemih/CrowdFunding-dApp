https://github.com/ahmedsemih/CrowdFunding-dApp/assets/102798814/165084d2-f40c-4bd2-bb54-fcaae466540f

# CrowdFunding dApp

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
![cf-ss-1](https://github.com/ahmedsemih/CrowdFunding-dApp/assets/102798814/0db3daea-4ac2-469d-add6-396d91dbf210)
![cf-ss-2](https://github.com/ahmedsemih/CrowdFunding-dApp/assets/102798814/d0d585bc-2327-4f4c-8c35-d6eecd512968)
![cf-ss-3](https://github.com/ahmedsemih/CrowdFunding-dApp/assets/102798814/3d9aff93-3f39-44fe-8a6e-feb1dd1800d9)
![cf-ss-4](https://github.com/ahmedsemih/CrowdFunding-dApp/assets/102798814/aa2272c6-5a91-46b0-aebd-c0fdd6b7e224)
![cf-ss-5](https://github.com/ahmedsemih/CrowdFunding-dApp/assets/102798814/fbe3626d-9c1a-467d-ba03-5779acfc0762)
![cf-ss-6](https://github.com/ahmedsemih/CrowdFunding-dApp/assets/102798814/b99f46d8-a93c-4c07-8ae4-00474b6024bf)

## :triangular_flag_on_post: Getting Started

First of all you need to clone the repository and install the dependencies

```shell

git clone https://github.com/ahmedsemih/CrowdFunding-dApp.git
cd client
npm install
cd ..
cd smart-contract
npm install

```

After doing this you must create a project on Alchemy. Then assign the following environment variables

```shell

--- CLIENT ---
NEXT_PUBLIC_API_BASE_URL - API url like: http://localhost:3000/api
NEXT_PUBLIC_PROVIDER_URL - Alchemy url with your API key
NEXT_PUBLIC_CONTRACT_ADDRESS - Address of your contract ( You will get this after deploy your contract )
NEXT_PUBLIC_PRIVATE_KEY - Metamask private key

--- SMART CONTRACT ---
ACCOUNT_PRIVATE_KEY - Metamask private key
PROJECT_ID - Alchemy API key

```

And deploy your smart contract then run your client

```shell

--- SMART CONTRACT ---
npx hardhat run scripts/deploy.js --network sepolia

--- CLIENT ---
npm run dev

```
