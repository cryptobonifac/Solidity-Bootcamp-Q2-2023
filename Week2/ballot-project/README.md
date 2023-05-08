# Ballot Project Week 2

Live on sepolia: https://sepolia.etherscan.io/address/0xa8C5aa27886Cb6A26c3F5Cd6D5Aa1D4F2CF6DaBB#writeContract


## Assignment 

Develop and run scripts for “Ballot.sol” within your group to
- give voting rights
- casting votes
- delegating votes
- and querying results


## Contract Interaction - delegate
- script located in directory `scripts\1.ballot.delegate.ts`  to delegate address to already deployed contract. Transaction hash 
https://sepolia.etherscan.io/tx/0x1be5e37f19d1184a170b664e1af73063af99ac871fb75c5df638505d67ccf27d called a Ballot contract delegate method with argument of delegating address `0x0121b93f000000000000000000000000a56436fc54b8201a2a5340f16be693b3711bf9c1`. The address who delegated was `0xe328b2c77e6e087c5680dcf3be0d6a3bfe5f84f0`

## Query results - read only
- script located in directorz `scripts\2.readEtherscanProvider` was used to interact with already deployed contract in Sepolia and getting chairperson address and winner game

## Testing 
- ballot tests were updated.