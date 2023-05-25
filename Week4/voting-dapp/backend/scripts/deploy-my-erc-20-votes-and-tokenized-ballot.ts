import { ethers } from "hardhat";
import { ContractFactory } from "ethers";
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL;

async function main() {
  // Get the signer to deploy the contract
  const provider = new ethers.providers.JsonRpcProvider(MUMBAI_RPC_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log(
    "Deploying the MyERC20Votes contract with the account:",
    signer.address
  );

  // Compile and deploy the MyERC20Votes contract
  const MyERC20VotesFactory: ContractFactory = await ethers.getContractFactory(
    "MyERC20Votes"
  );
  const myERC20Votes = await MyERC20VotesFactory.connect(signer).deploy();

  console.log("Waiting for deployment...");
  await myERC20Votes.deployed();

  console.log("MyERC20Votes contract deployed at:", myERC20Votes.address);

  console.log(
    "Deploying the TokenizedBallot contract with the account:",
    signer.address
  );
  const proposalNames: string[] = ["Proposal 1", "Proposal 2", "Proposal 3"];
  const proposalNamesBytes32 = proposalNames.map((name) =>
    ethers.utils.formatBytes32String(name)
  );

  const TokenizedBallotFactory: ContractFactory = await ethers.getContractFactory("TokenizedBallot");
  const tokenizedBallot = await TokenizedBallotFactory.connect(signer).deploy(
    proposalNamesBytes32,
    myERC20Votes.address,
  );

  console.log("Waiting for deployment...");
  await tokenizedBallot.deployed();

  console.log("TokenizedBallot contract deployed at:", tokenizedBallot.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
