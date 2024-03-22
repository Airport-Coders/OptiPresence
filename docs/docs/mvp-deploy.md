---
sidebar_position: 2
title: MVP Deploy
---

We have deployed the MVP on the following services:

-   Frontend: [Vercel](https://vercel.com/) 🌐
-   Offchain: [Heroku](https://www.heroku.com/) ☁️
-   Contracts: [Optimism testnet sepolia](https://chainlist.org/chain/11155420), with the ABI's and addresses on [IPFS](https://ipfs.tech/) 🔗

## Frontend 💻

The frontend of the MVP is deployed on Vercel, and you can access it by visiting [optipresence.vercel.app](https://optipresence.vercel.app/). The frontend has a CD pipeline that deploys changes on the `main` branch automatically. The embedded frontend is shown below:

<iframe src="https://optipresence.vercel.app/" width="100%" height="600" frameborder="0" allowfullscreen></iframe>

## Offchain 🖥️

The offchain service provides the backend services for blockchain events interaction. It is deployed on Heroku and also has a CD pipeline that deploys the changes on the `main` branch automatically. However, it is not accessible to the public because it is a backend service. The latest deploy logs:

```markdown
app[offchain.1]: Loading contract from: https://gateway.pinata.cloud/ipfs/QmXKRiVTHygfaPZR6D7pNaSVoS7Ym96g6zLmRWm9PtDLta
app[offchain.1]: Loading contract at address: 0xF9b81386b6B5ba17aE521024Ef30EfD38eCbA2f6
app[offchain.1]: Waiting for events...
```

## Contracts 📄

Here are the current deployed contracts on the `optimism testnet`, with the ABI's and addresses on IPFS. You can find the ABI's and the addresses of the [project contracts](https://github.com/Airport-Coders/OptiPresence/tree/main/smartcontracts/packages/hardhat/contracts) by getting the `address` and `abi` properties of the deployed contracts:

-   [UserRegistry](https://gateway.pinata.cloud/ipfs/QmemAFKSXauKjvGtmJ6g1Q4rAMaMxftgwcZFH9h3422DSJ)
-   [EventManager](https://gateway.pinata.cloud/ipfs/QmaLrH9dMkPNsLfekvmJsnHaeSJ1dwsGoUxsnbyRCyCnsp)
-   [CheckInManager](https://gateway.pinata.cloud/ipfs/QmXKRiVTHygfaPZR6D7pNaSVoS7Ym96g6zLmRWm9PtDLta)
