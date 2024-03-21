import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployCheckInManager: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const eventManager = await hre.ethers.getContract<Contract>("EventManager", deployer);
  const UserRegistry = await hre.ethers.getContract<Contract>("UserRegistry", deployer);

  await deploy("CheckInManager", {
    from: deployer,
    args: [eventManager.target, UserRegistry.target],
    log: true,
    autoMine: true,
  });
};

export default deployCheckInManager;

deployCheckInManager.tags = ["CheckInManager"];
