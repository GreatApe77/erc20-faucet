// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "../erc20/ERC20.sol";
import {ERC20Permit} from "../erc20/ERC20Permit.sol";
/**
 * @title Erc20 de teste para testar o contrato abstract ERC20
 * @notice Implementacao de um token ERC20 para testes
 */

contract DummyERC20 is ERC20,ERC20Permit {
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        address initialSupplyReceiver
    ) ERC20(name, symbol, totalSupply, initialSupplyReceiver) ERC20Permit(name) {}
}
