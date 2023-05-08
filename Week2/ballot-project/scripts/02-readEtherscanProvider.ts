import {ethers} from "ethers";
import * as dotenv from "dotenv";
const ballotContractJson = require("../artifacts/contracts/Ballot.sol/Ballot.json");

dotenv.config();

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3", "Proposal 4"];

const BALLOT_DEPLOYED_CONTRACT_ADDRESS = "0xa8C5aa27886Cb6A26c3F5Cd6D5Aa1D4F2CF6DaBB";
const TESTNET = "sepolia";

//Reads winnerName and chairPerson from already deployed contract on Sepolia testnet using Etherscan provider
//yarn ts-node --files .\deploy\02-readEtherscanProvider.ts
async function main(){

    const mnemonics = process.env.MNEMONIC as string;

    if(!mnemonics) {
        console.error("mnemonics are missing in .evn");
        process.exitCode = 1;
    }

    console.log(mnemonics);

    const signer  =  await ethers.Wallet.fromMnemonic(mnemonics);

    console.log(`Signer Wallet is :${signer.address}`)

    const provider = new  ethers.providers.EtherscanProvider(TESTNET,process.env.ETHERSCAN_API_KEY);

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

