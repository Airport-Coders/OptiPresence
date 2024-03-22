---
title: Starting the dapp
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## About docker files 🐳

In this project, we have three Docker Compose main files with one common service.

-   `docker-compose-deploy.yml` / **Deploy mode**: This file is used to deploy the contracts to the testnet and run a local off-chain server and the DApp frontend. It is necessary to set the environment variables in the `.env` file, instructions can be found in the [Environment Variables](./prerequisites#environment-variables) section.
-   `docker-compose-dev.yml` / **Development mode**: This file is used to run in development mode, operating the scaffold-op Next.js server to interact with the testnet contracts, local off-chain server, and the DApp frontend. It is necessary to set the environment variables in the `.env` file, instructions can be found in the [Environment Variables](./prerequisites#environment-variables) section.
-   `docker-compose-test.yml` / **Test mode**: This file is used to run the tests of the off-chain and the contracts in a local environment.

## Starting the dapp ⚙️

Now with all the prerequisites installed and the project cloned, you can start the Docker containers to run the DApp. You can do this by running the following command in the terminal, depending on the environment you wish to run the DApp:

<Tabs defaultValue="docker-compose-deploy" values={[
{label: 'Testnet deploy', value: 'docker-compose-deploy'},
{label: 'Development', value: 'docker-compose-dev'},
{label: 'Unit tests', value: 'docker-compose-test'}
]}>

<TabItem value="docker-compose-deploy">

```bash
docker compose -f docker-compose-deploy.yml up
```

</TabItem>

<TabItem value="docker-compose-dev">

```bash
docker compose -f docker-compose-dev.yml up
```

</TabItem>

<TabItem value="docker-compose-test">

```bash
docker compose -f docker-compose-test.yml up
```

</TabItem>
</Tabs>
