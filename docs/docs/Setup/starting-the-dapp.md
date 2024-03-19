---
title: Starting the dapp
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## About docker files

In this project, we have three docker compose main files with one common service.

-   `docker-compose-deploy.yml` / **Deploy mode**: This file is used to deploy the contracts to the testnet and the dapp to the local environment.
-   `docker-compose-dev.yml` / **Develpment mode**: This file is used to run the dapp in the local environment with the contracts deployed on local [hardhat](https://hardhat.org/) network.
-   `docker-compose-test.yml` / **Test mode**: This file is used to run the tests of the dapp and the contracts.

Details of Running Each of these modes:

-   **Deploy mode**: This mode is used to deploy the contracts to the testnet and the dapp to the local environment (use-ready). This mode is used to deploy the contracts to the testnet and the dapp to the local environment. Is needed to set the environment variables in the `.env` file, instructions can be found in the [Environment Variables](./prerequisites#environment-variables) section.
-   **Development mode**: This mode is used to run the dapp in the local environment with the contracts deployed on local [hardhat](https://hardhat.org/) network. Also this mode start the next server of [scaffold-op](https://github.com/ethereum-optimism/scaffold-op), and you can open the dapp on `http://localhost:3000`. The [contracts folder](https://github.com/Hackathon-NearX-Airport-Coders/optimism/tree/main/smartcontracts/packages/hardhat/contracts) and [deploy folder](https://github.com/Hackathon-NearX-Airport-Coders/optimism/tree/main/smartcontracts/packages/hardhat/deploy) are watched by a [nodemon](https://nodemon.io/) process, so you can change the contracts and the deploy scripts and the changes will trigger the deploy of the contracts and the dapp will be updated.
-   **Test mode**: This mode is used to run the tests of the dapp and the contracts. The tests are run by the [hardhat](https://hardhat.org/) framework.

## Starting the dapp

Now with all the prerequisites installed and the project cloned, you can start the docker containers to run the dapp. You can do this by running the following command on terminal, depending on the environment you want to run the dapp:

<Tabs defaultValue="docker-compose-dev" values={[
{label: 'Development', value: 'docker-compose-dev'},
{label: 'Testnet deploy', value: 'docker-compose-deploy'},
{label: 'Tests', value: 'docker-compose-test'}
]}>

<TabItem value="docker-compose-dev">

```bash
docker-compose -f docker-compose-dev.yml up
```

</TabItem>

<TabItem value="docker-compose-deploy">

```bash
docker-compose -f docker-compose-deploy.yml up
```

</TabItem>

<TabItem value="docker-compose-test">

```bash
docker-compose -f docker-compose-test.yml up
```

</TabItem>
</Tabs>
