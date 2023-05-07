import * as dotenv from "dotenv"
import { ethers } from "hardhat";
dotenv.config()

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "")
  const provider = ethers.getDefaultProvider("sepolia")
  const signer = wallet.connect(provider)

  const proposalsArguments = process.argv.slice(2)
  const proposals = proposalsArguments.length >= 1
    ? proposalsArguments
    : PROPOSALS
  console.log("Deploying Ballot contract with proposals:");
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });

  /**
   * Deploy Ballot contract
   */
  const ballotFactory = await ethers.getContractFactory("Ballot", signer)
  const ballotContrat = await ballotFactory.deploy(
    proposals.map(ethers.utils.formatBytes32String),
  )
  const deployTx = await ballotContrat.deployTransaction.wait()
  await ballotContrat.deployed()
  console.log(`The Ballot contract was deployed at ${
    ballotContrat.address
  } at block ${
    deployTx.blockNumber
  }`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
