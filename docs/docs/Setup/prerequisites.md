---
title: Prerequisites
sidebar_position: 0
---

You will learn about the prerequisites required to get started with the project, be it for development or production purposes.

## Packages

Before you start, you need to have the following prerequisites:

-   Have a unix-like environment (Linux, macOS, WSL, etc).
-   [Git](https://git-scm.com/) - Git is a distributed version control system.
-   [Docker / Docker compose](https://docs.docker.com/get-docker/) - Docker is a platform for building, running, and shipping applications. Docker Compose is a tool for defining and running multi-container Docker applications.
-   A wallet or a wallet provider to interact with the blockchain. You can use, for example: [Metamask](https://metamask.io/).
-   A account on [Alchemy](https://www.alchemy.com/) and [Pinata](https://pinata.cloud/) to get the required API keys.

## Project

You need to have the project cloned in your local machine. You can do this by running the following command on terminal:

```bash
git clone git@github.com:Airport-Coders/OptiPresence.git
```

and then, navigate to the project's root directory:

```bash
cd OptiPresence
```

## Environment Variables

On the root of the project, you will find a `.env.example` file. You need to create a `.env` file and copy the content of the `.env.example` file to it. Then, you need to fill in the environment variables with the required values.

```bash title=".env"
ALCHEMY_API_KEY="YOUR_ALCHEMY_API_KEY"
DEPLOYER_PRIVATE_KEY="YOUR_DEPLOY_WALLET_PRIVATE_KEY"
PINATA_JWT="YOUR_PINATA_JWT"
PINATA_GATEWAY="YOUR_PINATA_GATEWAY"
```

You can get the `ALCHEMY_API_KEY` by creating an account on [Alchemy](https://www.alchemy.com/), and [creating an alchemy app](https://cro-docs.alchemy.com/guides/getting-started#id-1.create-an-alchemy-app). The `DEPLOYER_PRIVATE_KEY` is the private key of the account that will deploy the contracts on testnet, you can follow the instructions on the [How to export an account's private key](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key) to get it. The `PINATA_JWT` and `PINATA_GATEWAY` are required to upload the images to IPFS, you can get them by creating an account on [Pinata](https://pinata.cloud/), [creating an API key](https://pinata.cloud/keys) and [getting the gateway](https://app.pinata.cloud/gateway).
