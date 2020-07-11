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

        emit swapComplete(msg.sender);
    }
}