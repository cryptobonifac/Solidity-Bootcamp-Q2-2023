import { ethers } from "hardhat";
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL;

// Below addresses are deployed on Mumbai
const tokenizedBallotAddress = "0x7Aa635a92b0E89fF6118A9D2e3c0fCb01A81bBCb";
const myERC20VotesAddress = "0x624f15bA871F6A7b2A78d1Cde8AE4168302FAc72";

// Set the voter, delegate and proposal index
const voterAddress = "0x63Ec8bcF66479CE5844Eb8cb5147C9D1CC448B95"; // Change voter and delegate address as appropriate
const delegateAddress = "0x9848d2ae3f54e0502aa74b6a24aa011ac28a1d28";
const proposalIndex = 1;

async function main() {
  // Create a signer from the private key
  const provider = new ethers.providers.JsonRpcProvider(MUMBAI_RPC_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  // Connect to the contracts
  const TokenizedBallot = await ethers.getContractFactory("TokenizedBallot");
  const tokenizedBallot = TokenizedBallot.connect(signer).attach(
    tokenizedBallotAddress
  );

  const MyERC20Votes = await ethers.getContractFactory("MyERC20Votes");
  const myERC20Votes = MyERC20Votes.connect(signer).attach(myERC20VotesAddress);

  // Give voting tokens to the voter address
  const mintAmount = ethers.utils.parseUnits("100", 18);
  await myERC20Votes.mint(voterAddress, mintAmount);
  console.log(`Minted ${mintAmount.toString()} tokens to ${voterAddress}`);

  // Delegate voting power to another address
  await myERC20Votes.connect(signer).delegate(delegateAddress);
  console.log(
    `Delegated voting power from ${voterAddress} to ${delegateAddress}`
  );

  // // Cast a vote on the TokenizedBallot
  // const voteAmount = ethers.utils.parseUnits("1", 18);
  // await tokenizedBallot.connect(signer).vote(proposalIndex, voteAmount);
  // console.log(
  //   `Vote cast for proposal ${proposalIndex} with ${voteAmount.toString()} tokens by ${delegateAddress}`
  // );

  // Check the voting power of the delegate address
  const votingPower = await myERC20Votes.getPastVotes(
    delegateAddress,
    await ethers.provider.getBlockNumber()
  );
  console.log(`Voting power of ${delegateAddress}: ${votingPower.toString()}`);

  // Query the current winning proposal and winner name
  const winningProposal = await tokenizedBallot.winningProposal();
  const winnerName = ethers.utils.parseBytes32String(
    await tokenizedBallot.winnerName()
  );
  console.log(`Current winning proposal: ${winningProposal} (${winnerName})`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
