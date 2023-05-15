# Tokenized Ballot Project

## Weekend project task
Develop and run scripts for “TokenizedBallot.sol” within your group to give voting tokens, delegating voting power, casting votes, checking vote power and querying results

with deploy, verify and interact scripts

deployed here https://mumbai.polygonscan.com/address/0x624f15ba871f6a7b2a78d1cde8ae4168302fac72

## Report

The interact script provided is written in TypeScript, specifically using Hardhat. It interacts with the TokenizedBallot.sol contract on the Mumbai test network. The script involves multiple operations such as minting tokens, delegating voting power, and querying the current winning proposal.

Minting Tokens: The script successfully mints ERC20 tokens using the 'MyERC20Votes' contract. It mints a specific amount (100 tokens) to a specified voter address. The minting process is successful, as confirmed by the console log indicating the tokens' minting.

Delegating Voting Power: The script assigns the voting power of the minted tokens to a delegate address. This process involves calling the 'delegate' function in the 'MyERC20Votes' contract. The delegation of voting power is also successful, as confirmed by the console log.

Querying Voting Power: The script checks the delegated voting power by calling the 'getPastVotes' function of the 'MyERC20Votes' contract. This function returns the voting power of the delegate address, which is successfully logged to the console.

Checking Winning Proposal: The script also queries the current winning proposal and the winner's name using the 'winningProposal' and 'winnerName' functions of the 'TokenizedBallot' contract. These operations are successful, as confirmed by the console log.

Casting Votes: The script includes code for casting a vote on a proposal. However, this operation fails due to an error, and the corresponding code is commented out. The error message indicates an 'Unpredictable Gas Limit' issue. This error usually arises when the Ethereum Virtual Machine (EVM) cannot determine the gas required for a transaction. In this case, it's because the smart contract's function throws an exception. The specific error message, "Vote amount takes voter over allocation," suggests that the voter tries to vote with an amount exceeding their allocated tokens.

In conclusion, executing the various functions of the TokenizedBallot contract programmatically with a script was mostly successful. However, the issue with casting votes needs to be addressed. This likely involves ensuring that the voting amount does not exceed the voter's allocation in the smart contract's logic.
