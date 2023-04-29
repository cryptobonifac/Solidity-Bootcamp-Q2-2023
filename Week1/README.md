# Report

Introduction:
This report discusses the deployment of the HelloWorld.sol contract to Sepolia and subsequent changes made to the contract by the owner. Additionally, we will explore the deployment of another instance of the contract, this time without the onlyOwner modifier in the setText function, allowing anyone to call it. While this modification does introduce potential security risks, it was made intentionally to enable broader access to the function.

Deployment of HelloWorld.sol Contract:
The HelloWorld.sol contract was successfully deployed to Sepolia. The contract owner then proceeded to call the setText function to change the text displayed by the contract. The newOwner function was also called to change the owner of the contract.

You can check the link for this contract:

https://sepolia.etherscan.io/address/0x2e4993f7c0357662f9948170a9faefde00e6b7d1

Modification of setText Function:
In the second deployment of the HelloWorld contract, the onlyOwner modifier was removed from the setText function, allowing anyone to call it. This modification was made intentionally to allow other individuals to modify the text displayed by the contract. However, it is important to note that removing the onlyOwner modifier introduces potential security risks, as it can allow unauthorized individuals to make modifications to the contract.

You can check the link for this contract:

https://sepolia.etherscan.io/address/0x2cf59014a759fedcd44db7a958f870d6f09aa2f6


Ether

Recommendations:
To mitigate potential security risks introduced by removing the onlyOwner modifier, it is recommended that a different mechanism for managing access to the function be implemented. One potential solution could be to introduce a permission system that allows certain individuals to modify the text displayed by the contract while restricting access for others.

Conclusion:
The deployment of the HelloWorld.sol contract to Sepolia was successful, and subsequent changes were made to the contract by the owner. In the second deployment of the contract, the onlyOwner modifier was intentionally removed from the setText function to allow anyone to modify the text. While this modification introduces potential security risks, it was made intentionally to enable broader access to the function. However, it is important to note that implementing additional access controls may be necessary to mitigate potential security risks.

