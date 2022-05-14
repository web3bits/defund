# DeFund

**// TODO** write actual readme

Folder structure:
- `contracts` contains Solidity smart contracts and tooling to develop, test and deploy it (Hardhat)
- `frontend` contains web3 dApp to interact with the contracts 

## How to deploy to Kovan testnet

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
npx hardhat run scripts/deploy.ts --network kovan
```

### 4. [OPTIONAL] Verify source code on Etherscan

Copy deployed address from step 3 and run:

```shell
npx hardhat verify --network kovan <DEPLOYED_CONTRACT_ADDRESS>
```
