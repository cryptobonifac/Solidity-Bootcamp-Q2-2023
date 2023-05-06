import { ethers, run } from "hardhat";
import * as dotenv from "dotenv";
const { developmentChains } = require("../helper-hardhat-config");
dotenv.config();

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];
// const ADDRESS = "0x777452cBc7E71B5286e60BA935292FFd49a597A5";

async function main() {
  const etherSigners = await ethers.getSigners();
  const signer = etherSigners[0];
  const balance = await signer.getBalance();
  console.log(`Balance of ${signer.address} is ${balance} wei`);
  console.log("Deploying Ballot contract");
  console.log("Proposals: ");
  PROPOSALS.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });
  const ballotFactory = await ethers.getContractFactory("Ballot");
  const ballotContract = await ballotFactory.deploy(
    PROPOSALS.map(ethers.utils.formatBytes32String)
  );
  const deployTx = await ballotContract.deployTransaction.wait();
  console.log(`The Ballot contract was deployed at ${ballotContract.address}`);
  const chairperson = await ballotContract.chairperson();
  console.log(`The Chairperson for this contract is ${chairperson}`);
  // const giveRightToVoteTx = await ballotContract.giveRightToVote(ADDRESS);
  // const giveRightToVoteTxReceipt = await giveRightToVoteTx.wait();
  // console.log(
  //   `The transaction hash is ${giveRightToVoteTxReceipt.transactionHash} included at the block ${giveRightToVoteTxReceipt.blockNumber}`
  // );

  // Verify the contract on Etherscan
  if (!developmentChains.includes(ethers.provider.network.chainId)) {
    console.log("Verifying contract on Etherscan...");
    await run("verify:verify", {
      address: ballotContract.address,
      constructorArguments: [PROPOSALS.map(ethers.utils.formatBytes32String)],
    });
    console.log("Contract verified on Etherscan!");
  } else {
    console.log("Skipping Etherscan verification on development chain.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
