import { ethers } from "hardhat";

// Below addresses are deployed on Mumbai
const tokenizedBallotAddress = "0x7Aa635a92b0E89fF6118A9D2e3c0fCb01A81bBCb";
const myERC20VotesAddress = "0x624f15bA871F6A7b2A78d1Cde8AE4168302FAc72";

// Set the voter, delegate and proposal index
const voterAddress = "0x789...";
const delegateAddress = "0xabc...";
const proposalIndex = 1;

async function main() {
  const [deployer] = await ethers.getSigners();

  // Connect to the contracts
  const TokenizedBallot = await ethers.getContractFactory("TokenizedBallot");
  const tokenizedBallot = TokenizedBallot.attach(tokenizedBallotAddress);

  const MyERC20Votes = await ethers.getContractFactory("MyERC20Votes");
  const myERC20Votes = MyERC20Votes.attach(myERC20VotesAddress);

  // Give voting tokens to the voter address
  const mintAmount = ethers.utils.parseUnits("1000", 18);
  await myERC20Votes.connect(deployer).mint(voterAddress, mintAmount);
  console.log(`Minted ${mintAmount.toString()} tokens to ${voterAddress}`);

  // Delegate voting power to another address
  await myERC20Votes.connect(voterAddress).delegate(delegateAddress);
  console.log(
    `Delegated voting power from ${voterAddress} to ${delegateAddress}`
  );

  // Cast a vote on the TokenizedBallot
  const voteAmount = ethers.utils.parseUnits("500", 18);
  await tokenizedBallot
    .connect(delegateAddress)
    .vote(proposalIndex, voteAmount);
  console.log(
    `Vote cast for proposal ${proposalIndex} with ${voteAmount.toString()} tokens by ${delegateAddress}`
  );

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
