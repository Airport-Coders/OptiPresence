---
title: Prerequisites
sidebar_position: 0
---

You will learn about the prerequisites required to get started with the project, be it for development or production purposes. 🚀

## Packages 📦

Before you start, you need to have the following prerequisites:

-   Have a unix-like environment (Linux, macOS, WSL, etc). 💻
-   [Git](https://git-scm.com/) - Git is a distributed version control system. 🌐
-   [Docker / Docker compose](https://docs.docker.com/get-docker/) - Docker is a platform for building, running, and shipping applications. Docker Compose is a tool for defining and running multi-container Docker applications. 🐳
-   A wallet or a wallet provider to interact with the blockchain. You can use, for example: [Metamask](https://metamask.io/). 👛
-   An account on [Alchemy](https://www.alchemy.com/) and [Pinata](https://pinata.cloud/) to get the required API keys. 🔑

## Project 📂

You need to have the project cloned in your local machine. You can do this by running the following command in the terminal:

```bash
git clone git@github.com:Airport-Coders/OptiPresence.git
```

and then, navigate to the project's root directory:

```bash
cd OptiPresence
```

## Environment Variables 🔐

On the root of the project, you will find a `.env.example` file. You need to create a `.env` file and copy the content of the `.env.example` file to it. Then, you need to fill in the environment variables with the required values.

```bash title=".env"
# Web3 provider
ALCHEMY_API_KEY="YOUR_ALCHEMY_API_KEY"
DEPLOYER_PRIVATE_KEY="YOUR_DEPLOY_WALLET_PRIVATE_KEY"

# IPFS
PINATA_JWT="YOUR_PINATA_JWT"
PINATA_GATEWAY="YOUR_PINATA_GATEWAY"

# OPTIONAL
# If you want to use the contracts deployed, you can set the ipfs gateway url here
CONTRACT_UserRegistry="http://gateway.pinata.cloud/ipfs/QmZ......................."
CONTRACT_EventManager="http://gateway.pinata.cloud/ipfs/QmZ......................."
CONTRACT_CheckInManager="http://gateway.pinata.cloud/ipfs/QmZ......................."
```

You can get the `ALCHEMY_API_KEY` by creating an account on [Alchemy](https://www.alchemy.com/), and [creating an Alchemy app](https://cro-docs.alchemy.com/guides/getting-started#id-1.create-an-alchemy-app). The `DEPLOYER_PRIVATE_KEY` is the private key of the account that will deploy the contracts on the testnet, you can follow the instructions on the [How to export an account's private key](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key) to get it. The `PINATA_JWT` and `PINATA_GATEWAY` are required to upload images to IPFS, you can get them by creating an account on [Pinata](https://pinata.cloud/), [creating an API key](https://pinata.cloud/keys), and [getting the gateway](https://app.pinata.cloud/gateway).

_🍀 optional: If you want to use the contracts deployed, you can set the IPFS gateway URL of each contract in the `.env` file. Here are the current deployed contracts IPFS's: [UserRegistry](https://gateway.pinata.cloud/ipfs/QmemAFKSXauKjvGtmJ6g1Q4rAMaMxftgwcZFH9h3422DSJ), [EventManager](https://gateway.pinata.cloud/ipfs/QmaLrH9dMkPNsLfekvmJsnHaeSJ1dwsGoUxsnbyRCyCnsp), [CheckInManager](https://gateway.pinata.cloud/ipfs/QmXKRiVTHygfaPZR6D7pNaSVoS7Ym96g6zLmRWm9PtDLta). If not set, the services of the project will use the contracts in local file mode._
