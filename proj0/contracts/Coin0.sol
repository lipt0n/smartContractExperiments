// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract Coin0 {
    // The keyword "public" makes variables
    // accessible from other contracts
    address public minter;
    mapping (address => uint) public balances;

    // Events allow clients to react to specific
    // contract changes you declare
    event Sent(address from, address to, uint amount);

    // Constructor code is only run when the contract
    // is created
    constructor() {
        minter = msg.sender;
    }
    function totalSupply() external view returns (uint256) {
      // must be enough for now
      // I will assume that minter have all of them
      return balances[minter];
    }
    function balanceOf(address addr) external view returns (uint256) {
      // must be enough for now
      // I will assume that minter have all of them
      console.log("checking balance of ", addr, "and it is:", balances[addr]);

      return balances[addr];
    }

    // Sends an amount of newly created coins to creator
    // Can only be called by the contract creator
    function mint(uint amount) public {
        require(msg.sender == minter);
        balances[minter] += amount;
    }

    // Errors allow you to provide information about
    // why an operation failed. They are returned
    // to the caller of the function.
    error InsufficientBalance(uint requested, uint available);

    // Sends an amount of existing coins
    // from any caller to an address
    function send(address receiver, uint amount) public {
        if (amount > balances[msg.sender])
            revert InsufficientBalance({
                requested: amount,
                available: balances[msg.sender]
            });

        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}