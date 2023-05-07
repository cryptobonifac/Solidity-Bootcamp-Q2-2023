import { ethers } from "hardhat";
import { ethers as eth } from "ethers";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];
const ADDRESSES = [
  '0xE328b2c77e6E087c5680DCf3bE0D6A3Bfe5f84F0', // bonifac1
  '0xa56436FC54B8201a2a5340f16be693B3711Bf9c1', // Axel R.
  '0x777452cBc7E71B5286e60BA935292FFd49a597A5', // palmcivet
  '0x9848d2ae3f54e0502aa74b6a24aa011ac28a1d28', // isaacdecoded
  '0x63Ec8bcF66479CE5844Eb8cb5147C9D1CC448B95', // sassit
  '0xD6f1386080518f6fd1a71638b831b231202d3B6f', // elwombat
]

async function main() {
  const proposalsArguments = process.argv.slice(2)
  const proposals = proposalsArguments.length >= 1
    ? proposalsArguments
    : PROPOSALS

  /**
   * Deploy Ballot contract
   */
  const ballotFactory = await ethers.getContractFactory("Ballot")
  const ballotContrat = await ballotFactory.deploy(
    proposals.map(ethers.utils.formatBytes32String),
  )
  await ballotContrat.deployTransaction.wait()
  await ballotContrat.deployed()

  /**
   * Interact with Ballot contract
   */
  // Get actual chairperson
  const chairperson = await ballotContrat.chairperson()
  console.log(`The chairperson for this contract is ${chairperson}`)


  // Set vote rights
  await Promise.all(ADDRESSES.map(async addr => {
    console.log(`Giving right to vote to address ${addr}`)
    const giveRightToVoteTx = await ballotContrat.giveRightToVote(addr)
    const giveRightToVoteTxReceipt = await giveRightToVoteTx.wait()
    console.log(`Vote right given with transaction hash ${
      giveRightToVoteTx.hash
    } included at block ${
      giveRightToVoteTxReceipt.blockNumber
    }`)
  }))

  const vote = async (proposalIndex: number) => {
    console.log(`Voting for proposal: ${proposals[proposalIndex]}`)
    const voteTx = await ballotContrat.vote(proposalIndex)
    const voteTxReceipt = await voteTx.wait()
    console.log(`Proposal voted with transaction hash ${
      voteTx.hash
    } included at block ${
      voteTxReceipt.blockNumber
    }`)
  }

  // Make a vote
  const proposalIndex = 1
  await vote(proposalIndex)

  // Try to vote twice
  try {
    const proposalIndex = 2
    await vote(proposalIndex)
  } catch (e) {
    console.log(`Vote tx failed due to: ${e}`)
  }

  // Check winning proposal
  console.log(`Checking winning proposal`)
  const winnerName = await ballotContrat.winnerName()
  console.log(`The winner proposal name is: ${ethers.utils.parseBytes32String(winnerName)}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
