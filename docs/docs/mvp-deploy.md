---
sidebar_position: 2
title: MVP Deploy
---

We have deployed the MVP on the following services:

-   Frontend: [Vercel](https://vercel.com/)
-   Offchain: [Heroku](https://www.heroku.com/)
-   Contracts: [Optimism testnet sepolia](https://chainlist.org/chain/11155420), with the ABI's and addresses on [IPFS](https://ipfs.tech/)

## Frontend

Frontend of the MVP is deployed on Vercel, you can access it by [optipresence.vercel.app](https://optipresence.vercel.app/). The frontend have a CD pipeline that deploys the changes on the `main` branch automatically. Embedded frontend is shown below:

<iframe src="https://optipresence.vercel.app/" width="100%" height="600" frameborder="0" allowfullscreen></iframe>

## Offchain

The offchain, provides the backend services for the blockchain events interaction, it is deployed on heroku, also have a CD pipeline that deploys the changes on the `main` branch automatically, but it is not accessible for the public because it is a backend service. Latest deploy logs:

```markdown
app[offchain.1]: Loading contract from: https://gateway.pinata.cloud/ipfs/QmXKRiVTHygfaPZR6D7pNaSVoS7Ym96g6zLmRWm9PtDLta
app[offchain.1]: Loading contract at address: 0xF9b81386b6B5ba17aE521024Ef30EfD38eCbA2f6
app[offchain.1]: Waiting for events...
```

## Contracts

Here are the current deployed contracts on `optimism testnet`, with the ABI's and addresses on IPFS, you can find the ABI's and the addresses of the [project contracts](https://github.com/Airport-Coders/OptiPresence/tree/main/smartcontracts/packages/hardhat/contracts) by geting the `address` and `abi` properties of the deployed contracts:

-   [UserRegistry](https://gateway.pinata.cloud/ipfs/QmemAFKSXauKjvGtmJ6g1Q4rAMaMxftgwcZFH9h3422DSJ)
-   [EventManager](https://gateway.pinata.cloud/ipfs/QmaLrH9dMkPNsLfekvmJsnHaeSJ1dwsGoUxsnbyRCyCnsp)
-   [CheckInManager](https://gateway.pinata.cloud/ipfs/QmXKRiVTHygfaPZR6D7pNaSVoS7Ym96g6zLmRWm9PtDLta)
