pragma solidity ^0.5.0;

import "@openzeppelin/contracts/GSN/Context.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

/**
 * @title NuLink
 * @dev A representation of oldNLINK on testnet
 */
contract NuLink is Context, ERC20, ERC20Detailed {

    /**
     * @dev Constructor that gives _msgSender() all of existing tokens.
     */
    constructor () public ERC20Detailed("NuLink", "ONLINK", 3) {
        _mint(_msgSender(), 10000 * (10 ** uint256(decimals())));
    }
}