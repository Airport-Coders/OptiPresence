---
title: Starting the dapp
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## About docker files

In this project, we have three docker compose main files with one common service.

-   `docker-compose-deploy.yml` / **Deploy mode**: This file is used to deploy the contracts to the testnet and run local off-chain server and the dapp frontend. Is needed to set the environment variables in the `.env` file, instructions can be found in the [Environment Variables](./prerequisites#environment-variables) section.
-   `docker-compose-dev.yml` / **Develpment mode**: This file is used to run in development mode, running the scaffold-op next server to interact with the testnet contracts, local off-chain server and the dapp frontend. Is needed to set the environment variables in the `.env` file, instructions can be found in the [Environment Variables](./prerequisites#environment-variables) section.
-   `docker-compose-test.yml` / **Test mode**: This file is used to run the tests of the off-chain and the contracts on local environment.

## Starting the dapp

Now with all the prerequisites installed and the project cloned, you can start the docker containers to run the dapp. You can do this by running the following command on terminal, depending on the environment you want to run the dapp:

<Tabs defaultValue="docker-compose-dev" values={[
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
