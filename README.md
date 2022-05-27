<h1 style="color: #EC6C4D">DeFund</h1>

DeFund is a decentralized platform for running all kinds of fundraisers. This project is a submission for Chainlink Spring 2022 Hackathon. For more details please visit:
https://defund.link  
https://chain.link/hackathon

**Warning!** This code is NOT production ready - the contracts have not been audited. It is currently deployed to Ethereum Kovan Testnet and is intended as a proof of concept, do not use to run real fundraisers!

If you're interested in contributing to this project, feel free to reach out.

## Repository folder structure:
- `contracts` contains Solidity smart contracts and tooling to develop, test and deploy it (Hardhat)
- `frontend` contains web3 dApp to interact with the contracts
- `infra` contains AWS CDK stack definition for frontend deployments

## How to deploy contracts to Kovan testnet

All commands in the `/contracts` folder. 

### 1. Config
Copy `.env.example` to `.env` and fill the values.

- `ETHERSCAN_API_KEY` - only used to verify source code, so not important. You can get it from Etherscan.  
- `KOVAN_RPC_URL` - can be obtained from Infura for example (https://infura.io/). Remember to use correct Eth network - Kovan.  
- `PRIVATE_KEY` - get it from MetaMask for example. This account will be used to pay gas fees to deploy, so be careful, don't use account with "real funds", only testnet tokens and ETH!

### 2. Install dependencies

```shell
yarn install
```

### 3. Run deploy script

```shell
yarn hardhat run scripts/deploy.ts --network kovan
```

### 4. [OPTIONAL] Verify source code on Etherscan

Copy deployed address from step 3 and run:

```shell
yarn hardhat verify --network kovan <DEPLOYED_CONTRACT_ADDRESS>
```

## Frontend

### Install

```shell
cd frontend
yarn install
cp .env.example .env
```

Then fill out values in `.env` file. Note that you'll need to obtain credentials for:
- Moralis (https://moralis.io) - used for its awesome web3 related functionalities
- Web3.Storage (https://web3.storage/) - used to easily store and retrieve data from IPFS/Filecoin

### Run locally in dev mode

`yarn start`

### Production builds

Please review GitHub Actions present in the repository.