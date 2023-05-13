import { ethers, run } from "hardhat";
import { ContractFactory } from "ethers";

async function main() {
  const proposalNames: string[] = ["Proposal 1", "Proposal 2", "Proposal 3"];
  const targetBlockNumber = 12345;
  const tokenContractAddress = "0x624f15bA871F6A7b2A78d1Cde8AE4168302FAc72"; // Contract address on Mumbai

  const proposalNamesBytes32 = proposalNames.map((name) =>
    ethers.utils.formatBytes32String(name)
  );

  // Get the signer to deploy the contract
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying the TokenizedBallot contract with the account:",
    deployer.address
  );

  // Compile and deploy the TokenizedBallot contract
  const TokenizedBallotFactory: ContractFactory =
    await ethers.getContractFactory("TokenizedBallot");
  const tokenizedBallot = await TokenizedBallotFactory.connect(deployer).deploy(
    proposalNamesBytes32,
    tokenContractAddress,
    targetBlockNumber
  );

  console.log("Waiting for deployment...");
  await tokenizedBallot.deployed();

  console.log("Waiting for additional confirmations...");
  await deployer.provider!.waitForTransaction(
    tokenizedBallot.deployTransaction.hash,
    5
  );

  console.log("TokenizedBallot contract deployed at:", tokenizedBallot.address);

  // Verify the contract on Etherscan
  console.log("Verifying the contract...");
  await run("verify:verify", {
    address: tokenizedBallot.address,
    constructorArguments: [
      proposalNamesBytes32,
      tokenContractAddress,
      targetBlockNumber,
    ],
  });
  console.log("Contract verified on Etherscan");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
