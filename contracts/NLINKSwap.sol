pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

/**
 * @title Swap
 * @dev A straight forward swap implementation for NULINK
 */

contract NLINKSwap is Ownable {

    IERC20 public _oldNLINK;
    IERC20 private _newNLINK;

    event swapComplete(address recipient);

    mapping (address => uint) Swaps;

    constructor (IERC20 oldNLINK, IERC20 newNLINK) public {
        _oldNLINK = oldNLINK;
        _newNLINK = newNLINK;
    }

    function getTokenBalance(IERC20 _token, address _address) public view returns (uint256) {
        return _token.balanceOf(_address);
    }

    function createSwap(uint _amount) public {
        address recipient = msg.sender;
        _oldNLINK.transferFrom(recipient, address(this), _amount);
        _newNLINK.transfer(recipient, _amount);
    }
}



/*

Someone wants to swap his NLINK to the new ERC677 NLINK.
He opens up the web interface and receives an address to send his NLINK to
He is notified the address which he is sending from will receive the new ERC677
After he sends NLINK to the contract, web app already listens for transactions
When web app hears one, it captures value key and returns the exact amount of tokens to the sender

A simple mapping of sender => ERC20 amount created to track previous swaps

    IERC20 private _oldNLINK = ERC20(0x0332E604E20f9b12c41D99001E9F23f61B32ff1D);
    IERC20 private _newNLINK = ERC20(0x0);

*/