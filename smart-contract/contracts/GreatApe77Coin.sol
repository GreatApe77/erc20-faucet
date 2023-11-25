// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import {ERC20} from "./erc20/ERC20.sol";
import {Ownable} from "./Ownable/Ownable.sol";
contract GreatApe77Coin is ERC20,Ownable {
    constructor() ERC20("GreatApe77 Coin", "GRTAPE", 77000000 ether) {
    }
}
