import {BigNumber, PopulatedTransaction, Wallet, ethers} from "ethers";
import * as dotenv from "dotenv";
import { FeeData, TransactionReceipt, TransactionResponse } from "@ethersproject/abstract-provider";
const ballotContractJson = require("../artifacts/contracts/Ballot.sol/Ballot.json");

dotenv.config();

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3", "Proposal 4"];

const BALLOT_DEPLOYED_CONTRACT_ADDRESS = "0x63Ec8bcF66479CE5844Eb8cb5147C9D1CC448B95";
const TESTNET = "sepolia";
let  DELEGATE_ADDRESS  = "0xa56436FC54B8201a2a5340f16be693B3711Bf9c1";


// TODO 
// voting address from arguments
async function Main(){

    // create a wallet  
    let wallet : Wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");

    // create a provider instance Etherscan on Sepolia testnet
    const provider = new ethers.providers.EtherscanProvider("sepolia", process.env.ETHERSCAN_API_KEY);

    // connect signer to provider
    // maybe not needed? 
    wallet = await wallet.connect(provider);

    //create a Ballot contract instance of already deployed contract 
    const ballotContractInstance = new ethers.Contract(BALLOT_DEPLOYED_CONTRACT_ADDRESS,ballotContractJson.abi,provider);
    
    //prepare transaction
    let unsignedTrx : PopulatedTransaction= await ballotContractInstance.populateTransaction.delegate(DELEGATE_ADDRESS);
    
    // estimate gas for transaction
    // maybe not needed?
      const  feeData :FeeData = await provider.getFeeData(); 
      const estimateGas = await wallet.estimateGas(unsignedTrx);

      const gasToTransaction = {
        maxPriorityFeePerGas : BigNumber.from(feeData.maxPriorityFeePerGas),
        maxFeePerGas: BigNumber.from(feeData.maxFeePerGas)
      }

      // build transaction
      unsignedTrx = {...unsignedTrx, ...gasToTransaction}

      console.log('Transaction created');

    // send transaction into blockchain
    const trxResponse: TransactionResponse = await wallet.sendTransaction(unsignedTrx);

    // wait for 1st block 
    const transactionReceipt :TransactionReceipt =  await trxResponse.wait();

    console.log(`Transaction signed and sent: ${transactionReceipt.blockHash}`);

    console.log(
        `Transaction has been mined at blocknumber: ${transactionReceipt.blockNumber}, transaction hash: ${transactionReceipt.transactionHash}`
      );
}

Main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });