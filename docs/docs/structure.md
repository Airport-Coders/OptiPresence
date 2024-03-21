---
sidebar_position: 0
title: Structure
---

Here you can find the structure of the project, with the smart contracts, frontend, offchain, docker services and CI/CD workflow.

## High Level Overview of user interaction

A user interaction diagram that shows the flow of the user interaction with the system. The user can register, create an event, check-in to an event, and validate the check-in.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/Hy7zLRFrPoBZBa9R27vPeY"></iframe>

## Folders

-   [smartcontracts](https://github.com/Airport-Coders/OptiPresence/tree/main/smartcontracts): Repository of [Scaffold-op](https://github.com/ethereum-optimism/scaffold-op) with the smart contracts and tests for the project.
-   [frontend](https://github.com/Airport-Coders/OptiPresence/tree/main/frontend): The [Next.js](https://nextjs.org/) application for the frontend of the project with [rainbowkit](https://www.rainbowkit.com/) and [wagmi](https://wagmi.sh/) for integration on the blockchain.
-   [offchain](https://github.com/Airport-Coders/OptiPresence/tree/main/offchain): Offchain [python](https://www.python.org/) service for the project, with the [web3](https://github.com/ethereum/web3.py) package to listen to events on the blockchain and validate the face recognition and geo-location of the users.
-   [docs](https://github.com/Airport-Coders/OptiPresence/tree/main/docs): Documentation of the project with [docusaurus](https://docusaurus.io/). _You are here 🤓_.
-   [.github](https://github.com/Airport-Coders/OptiPresence/tree/main/.github): Github actions for the project, with the tests and autodeploy of the frontend and offchain services.
-   `Dockerfile.* and docker-compose-*.yml`: Docker containers for the services of the project, with the [docker-compose](https://docs.docker.com/compose/) for the development, production and test environments.

## Contracts

You can find the smart contracts in the [contracts folder](https://github.com/Airport-Coders/OptiPresence/tree/main/smartcontracts/packages/hardhat/contracts) and the tests in the [test folder](https://github.com/Airport-Coders/OptiPresence/tree/main/smartcontracts/packages/hardhat/test) of the repository. The contracts are written in Solidity and are used to manage the user registry, event management, and check-in processes. The tests are written in Typescript and are used to ensure the contracts are functioning as expected with different scenarios.

### UserRegistry

Manages user registrations and their facial identifiers, ensuring added security through encapsulation. Users are identified by addresses, and their data includes names and IPFS hashes of facial images. The contract employs modifiers to validate user existence, name, and face hash integrity. It features functions for registering, updating, and retrieving user information, with events logged for new registrations and updates.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/593qpT6XgHF1otJqQq3Ytu"></iframe>

### EventManager

Manages event creation and details, tailored for use with a decentralized platform. It defines an `Event` struct to store comprehensive event details, including name, description, image hash (stored as an IPFS hash), location (latitude and longitude), owner, start and end times, and an activity status. The contract supports creating new events, updating existing events, and retrieving event information, ensuring actions such as updates are restricted to the event's owner. Modifiers validate event data, including time ranges, locations, and IPFS image hashes. Events for creation are emitted to log activity.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/Q6s5cuHUuojB4i8RJvsH2T"></iframe>

### CheckInManager

manages check-in requests and validations for events, integrating with external `EventManager` and `UserRegistry` contracts. It supports functionalities including request submission, off-chain validation, and check-in status management. Structs and enums define check-in data and status. Features include limiting check-in attempts, validating event existence and timing, and ensuring actions are performed by designated roles such as the off-chain validator. The contract emits events for different stages of the check-in process, enabling transparency and traceability. It allows users to retrieve their check-in statuses and provides functionalities for the off-chain validator to approve or reject check-ins based on external validations.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/4B4zVB8PfMJAxG1MxycipT"></iframe>

### Internal Interaction Sequence

This diagram illustrates the sequence of interactions between the contracts, including the `UserRegistry`, `EventManager`, and `CheckInManager`. It shows the flow of actions such as check-in request submission and off-chain validation. The sequence diagram provides a high-level overview of the interactions and the order of operations between the contracts. You can see the `CheckInManager` is the central contract that interacts with the other two contracts, and the sequence of actions for check-in requests and validations.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/Vc7fidHDSz8txJQ5wy6mUH"></iframe>

## Docker

### Services

List of all services that are in the project and their respective details.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/XBbpRHtAkJwhkaRnwKFDWy"></iframe>

### Environments

Here you can see the environments of the project and the services that are running in each one, with details of the command and the extended services.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/K26ouFXSN1LEx6sZL6mVDM"></iframe>

### Dependencies

In this diagram you can follow the dependencies of the services and dockerfiles of the project.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/Liunwf1seSmkfHCkLJXJCo"></iframe>

## CI/CD Actions

<!-- About github actions tests and autodeploy of dapp -->

...
