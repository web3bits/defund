# DeFund

TODO write actual readme

## How to deploy to Kovan testnet

### 1. Config
Copy `.env.example` to `.env` and fill the values.

`ETHERSCAN_API_KEY` - only used to verify source code, so not important. You can get it from Etherscan.
`KOVAN_RPC_URL` - can be obtained from Infura for example (https://infura.io/). Remember to use correct Eth network - Kovan.
`PRIVATE_KEY` - get it from MetaMask for example. This account will be used to pay gas fees to deploy, so be careful, don't use account with "real funds", only testnet tokens and ETH! 

### 2. Install dependencies

```shell
yarn install
```

### 3. Run deploy script

```shell
cd contracts
npx hardhat run scripts/deploy.ts --network kovan
```

### 4. [OPTIONAL] Verify source code on Etherscan 

Copy deployed address from step 3 and run:

```shell
npx hardhat verify --network kovan <DEPLOYED_CONTRACT_ADDRESS>
```

---------

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/deploy.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
