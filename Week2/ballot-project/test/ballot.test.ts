import { expect } from "chai";
import { ethers } from "hardhat";
import { Ballot } from "../typechain-types";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

describe("Ballot", function () {
  let ballotContract: Ballot;
  let chairperson: string;
  let accounts: ethers.Signer[];

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    chairperson = accounts[0].address;
    const ballotFactory = await ethers.getContractFactory("Ballot");
    ballotContract = await ballotFactory.deploy(
      convertStringArrayToBytes32(PROPOSALS)
    );
    await ballotContract.deployed();
  });

  describe("when the contract is deployed", function () {
    it("has the provided proposals", async function () {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index);
        expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(
          PROPOSALS[index]
        );
      }
    });

    it("has zero votes for all proposals", async function () {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index);
        expect(proposal.voteCount).to.eq(0);
      }
    });

    it("sets the deployer address as chairperson", async function () {
      const chairpersonAddress = await ballotContract.chairperson();
      expect(chairpersonAddress).to.eq(chairperson);
    });

    it("sets the voting weight for the chairperson as 1", async function () {
      const chairpersonVoter = await ballotContract.voters(chairperson);
      expect(chairpersonVoter.weight).to.eq(1);
    });
  });

  describe("when the chairperson interacts with the giveRightToVote function in the contract", function () {
    it("gives right to vote for another address", async function () {
      const voterAddress = accounts[1].address;
      await ballotContract.giveRightToVote(voterAddress);
      const voter = await ballotContract.voters(voterAddress);
      expect(voter.weight).to.eq(1);
    });

    it("can not give right to vote for someone that has voted", async function () {
      const voterAddress = accounts[1].address;
      await ballotContract.giveRightToVote(voterAddress);
      await ballotContract.connect(accounts[1]).vote(0);
      await expect(
        ballotContract.giveRightToVote(voterAddress)
      ).to.be.revertedWith("The voter already voted.");
    });

    it("can not give right to vote for someone that has already voting rights", async function () {
      const voterAddress = accounts[1].address;
      await ballotContract.giveRightToVote(voterAddress);
      await expect(ballotContract.giveRightToVote(voterAddress)).to.be.reverted;
    });
  });

  describe("when the voter interact with the vote function in the contract", function () {
    it("should register the vote", async () => {
      const voterAddress = accounts[1].address;
      await ballotContract.giveRightToVote(voterAddress);
      await ballotContract.connect(accounts[1]).vote(0);
      const voter = await ballotContract.voters(voterAddress);
      expect(voter.voted).to.be.true;
      expect(voter.vote).to.eq(0);
      const proposal = await ballotContract.proposals(0);
      expect(proposal.voteCount).to.eq(1);
    });
  });

  describe("when the voter interact with the delegate function in the contract", function () {
    it("should transfer voting power", async () => {
      const voterAddress = accounts[1].address;
      const delegateAddress = accounts[2].address;
      await ballotContract.giveRightToVote(voterAddress);
      await ballotContract.giveRightToVote(delegateAddress); // New line added
      await ballotContract.connect(accounts[1]).delegate(delegateAddress);
      const voter = await ballotContract.voters(voterAddress);
      const delegate = await ballotContract.voters(delegateAddress);
      expect(voter.voted).to.be.true;
      expect(voter.delegate).to.eq(delegateAddress);
      expect(delegate.weight).to.eq(2);
    });
  });

  describe("when an attacker interacts with the giveRightToVote function in the contract", function () {
    it("should revert", async () => {
      const attacker = accounts[3];
      const voterAddress = accounts[4].address;
      await expect(
        ballotContract.connect(attacker).giveRightToVote(voterAddress)
      ).to.be.revertedWith("Only chairperson can give right to vote.");
    });
  });

  describe("when an attacker interacts with the vote function in the contract", function () {
    it("should revert", async () => {
      const attacker = accounts[3];
      await expect(ballotContract.connect(attacker).vote(0)).to.be.revertedWith(
        "Has no right to vote"
      );
    });
  });

  describe("when an attacker interacts with the delegate function in the contract", function () {
    it("should revert", async () => {
      const attacker = accounts[3];
      const delegateAddress = accounts[4].address;
      await expect(
        ballotContract.connect(attacker).delegate(delegateAddress)
      ).to.be.revertedWith("You have no right to vote");
    });
  });

  describe("when someone interacts with the winningProposal function before any votes are cast", function () {
    it("should return 0", async () => {
      const winningProposal = await ballotContract.winningProposal();
      expect(winningProposal).to.eq(0);
    });
  });

  describe("when someone interacts with the winningProposal function after one vote is cast for the first proposal", function () {
    it("should return 0", async () => {
      const voterAddress = accounts[1].address;
      await ballotContract.giveRightToVote(voterAddress);
      await ballotContract.connect(accounts[1]).vote(0);
      const winningProposal = await ballotContract.winningProposal();
      expect(winningProposal).to.eq(0);
    });
  });

  describe("when someone interacts with the winnerName function before any votes are cast", function () {
    it("should return name of proposal 0", async () => {
      const winnerName = await ballotContract.winnerName();
      expect(ethers.utils.parseBytes32String(winnerName)).to.eq(PROPOSALS[0]);
    });
  });

  describe("when someone interacts with the winnerName function after one vote is cast for the first proposal", function () {
    it("should return name of proposal 0", async () => {
      const voterAddress = accounts[1].address;
      await ballotContract.giveRightToVote(voterAddress);
      await ballotContract.connect(accounts[1]).vote(0);
      const winnerName = await ballotContract.winnerName();
      expect(ethers.utils.parseBytes32String(winnerName)).to.eq(PROPOSALS[0]);
    });
  });

  describe("when someone interacts with the winningProposal function and winnerName after 5 random votes are cast for the proposals", function () {
    it("should return the name of the winner proposal", async () => {
      for (let i = 1; i <= 5; i++) {
        const voterAddress = accounts[i].address;
        await ballotContract.giveRightToVote(voterAddress);
        await ballotContract.connect(accounts[i]).vote(i % PROPOSALS.length);
      }
      const winningProposalIndex = (
        await ballotContract.winningProposal()
      ).toNumber();
      const winnerName = await ballotContract.winnerName();
      expect(ethers.utils.parseBytes32String(winnerName)).to.eq(
        PROPOSALS[winningProposalIndex]
      );
    });
  });
});
