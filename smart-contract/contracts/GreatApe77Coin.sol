// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "./erc20/ERC20.sol";

contract GreatApe77Coin is ERC20 {

    string public constant CREATOR = "Mateus Navarro";

    constructor(
        address initialSupplyReceiver
    )
        ERC20(
            "GreatApe77 Coin",
            "GRTAPE",
            77000000 ether,
            initialSupplyReceiver
        )
    {}
}
