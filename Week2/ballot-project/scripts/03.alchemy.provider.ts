import {ethers} from "ethers";
import * as dotenv from "dotenv";
const ballotContractJson = require("../artifacts/contracts/Ballot.sol/Ballot.json");

dotenv.config();

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3", "Proposal 4"];

const BALLOT_DEPLOYED_CONTRACT_ADDRESS = "0xa8C5aa27886Cb6A26c3F5Cd6D5Aa1D4F2CF6DaBB";
const TESTNET = "sepolia";

async function main(){

   var test = process.env.PRIVATE_KEY; 
   

    const wallet  =  new ethers.Wallet(process.env.PRIVATE_KEY ?? "");

    console.log(`Signer Wallet is :${wallet.address}`)

    const provider = new  ethers.providers.AlchemyProvider(TESTNET,process.env.ALCHEMY_API_KEY);

    const BallotContract = new ethers.Contract(BALLOT_DEPLOYED_CONTRACT_ADDRESS,ballotContractJson.abi,provider)

    const winnerName = await BallotContract.winnerName(); 
    const chairperson = await BallotContract.chairperson();

     console.log(`Winner name is: ${winnerName}`);  
     console.log(`Chairperson is : ${chairperson}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
