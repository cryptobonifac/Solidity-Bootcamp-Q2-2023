// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
import "./MyERC20Token.sol";


contract TokenSale {

    //can not have decimals here
    // only positive numbers 
    // EVM does not have decimal only bytes
    uint256  public ratio;

    // dont do 
    // evything single byte we store here 
    // MyERC20Token paymentToken; 
    MyERC20Token public paymentToken; 
    //address public paymentToken;

    //address public paymentToken; 

    // no need to specify data location for int type 
    constructor(uint256 _ratio, MyERC20Token _paymentToken)
    {
        ratio = _ratio;

        // my paymentToken is interface attached to paymentToken address I receive
       paymentToken = _paymentToken; // paymentToken = MyERC20Token(_paymentToken);
       

        // this is possible but not prefered  
      //  paymentToken = new MyERC20Token(); 
    }


   // no need to specify amount 
    function buyTokens() external payable {
        paymentToken.mint(msg.sender, msg.value * ratio);    
    }
}
