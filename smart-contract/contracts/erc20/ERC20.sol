// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "./interfaces/IERC20.sol";

/**
 * @title ERC20 implementado por Mateus
 * @author Mateus Navarro
 * @notice implementacao do padrao ERC20
 */
abstract contract ERC20 is IERC20 {
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    uint256 private _totalSupply;
    mapping(address account => uint256 balance) private _balances;

    /**
     * @notice Configuraçoes iniciais do token
     * @param name_ Nome do token
     * @param symbol_ Simbolo do token
     * @param decimals_ Quantidade de casas decimais do token ex: 18
     * @param totalSupply_ Quantidade total de tokens em circulacao (supply fixo)
     */
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 totalSupply_
    ) {
        _name = name_;
        _symbol = symbol_;
        _decimals = decimals_;
        _totalSupply = totalSupply_;
    }

    function name() external view returns (string memory) {
        return _name;
    }

    function symbol() external view returns (string memory) {
        return _symbol;
    }

    function decimals() external view returns (uint8) {
        return _decimals;
    }
}
