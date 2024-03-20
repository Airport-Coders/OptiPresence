import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployUserRegistry: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("UserRegistry", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
};

export default deployUserRegistry;

deployUserRegistry.tags = ["UserRegistry"];
