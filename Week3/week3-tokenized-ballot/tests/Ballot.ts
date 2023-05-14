import { ethers } from "hardhat";
import { Ballot, Ballot__factory } from "../typechain-types";
import { expect } from "chai";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];
let ballotContract : Ballot; 

function convertStringArrayToBytes32(array: string[]) {
    const bytes32Array = [];
    for (let index = 0; index < array.length; index++) {
      bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
    }
    return bytes32Array;
  }


describe("Ballot", () => {

    let ballotContract : Ballot; 

    beforeEach(async ()=> {

    const ballotContractFactory = await ethers.getContractFactory("Ballot");
    ballotContract = (
        await ballotContractFactory.deploy(PROPOSALS.map((prop) => ethers.utils.formatBytes32String(prop))));
     await ballotContract.deployed();
     
    });

    describe("when the contract is deployed", () => { 
        
    it("has the provided proposals", async function () {
        for (let index = 0; index < PROPOSALS.length; index++) {
          const proposal = await ballotContract.proposals(index);
          expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(
            PROPOSALS[index]
          );
        }
      });
    });

    it("has the provided proposals", async function () {
        for (let index = 0; index < PROPOSALS.length; index++) {
          const proposal = await ballotContract.proposals(index);
          expect(proposal.voteCount).to.eq(0);
        }
      });

    it("sets the deployer address as chairperson", async function () {

    const chairperson = await ballotContract.chairperson(); 
    const accounts = await ethers.getSigners(); 
    expect(chairperson).to.be.eq(accounts[0].address);
    });

    it("sets the voting weight for the chairperson as 1", async function () {

    const chairperson = await ballotContract.chairperson();
    const accounts = await ethers.getSigners();  
    const voter2 = await ballotContract.voters(await ballotContract.chairperson());

    expect(voter2.weight).to.eq(1);
    });
});