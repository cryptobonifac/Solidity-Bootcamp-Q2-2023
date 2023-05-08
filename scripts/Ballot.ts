import {ethers} from "hardhat"

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3", "Proposal 4"];
const ADDRESS = "0xE328b2c77e6E087c5680DCf3bE0D6A3Bfe5f84F0";


async function main(){

    // const etherSigners = await ethers.getSigners(); 
    // const signer = etherSigners[0];
    // const balance = await signer.getBalance();
    // console.log(`Balance of signer is ${balance} Wei`);


 
;




    return;


    console.log(`Arguments are ${process.argv.slice(2)}`)
    


    console.log("Deploying Ballot contract")

    const ballotfactory = await ethers.getContractFactory("Ballot");
    const ballotContract = await ballotfactory.deploy(
        PROPOSALS.map(p =>  ethers.utils.formatBytes32String(p))
    )

    const deployTx = await ballotContract.deployTransaction.wait();

    console.log({deployTx});

    await ballotContract.deployed;
    
    console.log(`Ballot contract deployed to address: ${ballotContract.address} at block ${deployTx.blockNumber} `);

    const chairperson = await ballotContract.chairperson();
    console.log(`Chairperson for Ballot contract is ${chairperson}`);

    const giveRightsToVoteTx = await ballotContract.giveRightToVote(ADDRESS)
    const giveRightsToVoteTxReceipt = await giveRightsToVoteTx.wait();

    console.log(`Giving rights to vote to: ${ADDRESS}
     at transactionHash ${(await giveRightsToVoteTxReceipt).blockHash} in blocknumber ${(await giveRightsToVoteTxReceipt).blockNumber}`) 

}

main().catch((error) => {

    console.error(error);
    process.exitCode = 1;
});
