import { ethers } from "hardhat";
import { ContractFactory } from "ethers";

async function main() {
  // Get the signer to deploy the contract
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying the MyERC20Votes contract with the account:",
    deployer.address
  );

  // Compile and deploy the MyERC20Votes contract
  const MyERC20VotesFactory: ContractFactory = await ethers.getContractFactory(
    "MyERC20Votes"
  );
  const myERC20Votes = await MyERC20VotesFactory.connect(deployer).deploy();

  console.log("Waiting for deployment...");
  await myERC20Votes.deployed();

  console.log("MyERC20Votes contract deployed at:", myERC20Votes.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
