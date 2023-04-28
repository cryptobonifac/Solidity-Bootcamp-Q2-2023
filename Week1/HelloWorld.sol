// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

//@title Hello world contract
//@notice be careful lol
contract HelloWorld {
    string private text;
    address public owner;

//@notice initialize contract and sets owner
    constructor() {
        text = "Hello World";
        owner = msg.sender;
    }
    
     modifier onlyOwner() {
        require (msg.sender == owner, "Caller is not the owner");
        _;
    }

    function helloWorld() public view returns (string memory) {
        return text;
    }

//@notice sets text to new value,restricted to owner of the contract
//@param new text
    function setText(string calldata newText) public onlyOwner {
        text = newText;
    }

//@notice transfers ownership of the contract,restricted to owner of the contract
//@param address of new owner
    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }   
}