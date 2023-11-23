// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "./interfaces/IERC20.sol";
import {IERC20Errors} from "./interfaces/IERC20Error.sol";

/**
 * @title ERC20 implementado por Mateus
 * @author Mateus Navarro
 * @notice implementacao do padrao ERC20
 * @notice se deseja trocar o decimals, reescreva a funcao decimals() e altere o valor de retorno utilizando o modificador override
 */
abstract contract ERC20 is IERC20, IERC20Errors {
    string private _name;
    string private _symbol;
    uint256 private _totalSupply;
    mapping(address account => uint256 balance) private _balances;
    mapping(address account => mapping(address approvedAddress => uint256 approvedValue))
        private _allowances;

    /**
     * @notice Configuraçoes iniciais do token
     * @notice decimals vem com o valor padrao de 18
     * @param name_ Nome do token
     * @param symbol_ Simbolo do token
     * @param totalSupply_ Quantidade total de tokens em circulacao (supply fixo)
     */
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 totalSupply_
    ) {
        _name = name_;
        _symbol = symbol_;
        _totalSupply = totalSupply_;
        _setBalance(msg.sender, totalSupply_);
    }

    function name() external view returns (string memory) {
        return _name;
    }

    function symbol() external view returns (string memory) {
        return _symbol;
    }

    function decimals() public pure virtual returns (uint8) {
        return 18;
    }

    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function transfer(
        address to,
        uint256 value
    ) external override returns (bool) {
        if (to == address(0)) {
            revert ERC20__transferToZeroAddress();
        }
        _transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external override returns (bool) {}

    function approve(
        address spender,
        uint256 value
    ) external override returns (bool) {
        if (spender == address(0)) {
            revert ERC20__approveToZeroAddress();
        }
        if (value > balanceOf(msg.sender)) {
            revert ERC20__approveInsufficientBalance();
        }
        _approve(msg.sender, spender, value);
        return true;
    }

    function allowance(
        address owner,
        address spender
    ) external view override returns (uint256) {
        return _allowances[owner][spender];
    }

    function _transfer(address from, address to, uint256 value) internal {
        uint256 balanceFrom = balanceOf(from);
        uint256 balanceTo = balanceOf(to);
        if (value > balanceFrom) {
            revert ERC20__transferInsufficientBalance();
        }
        _setBalance(from, balanceFrom - value);
        _setBalance(to, balanceTo + value);
        emit Transfer(from, to, value);
    }

    function _approve(address owner, address spender, uint256 value) internal {
        _allowances[owner][spender] = value;
        emit Approval(owner, spender, value);
    }

    function _setBalance(address account, uint256 value) internal {
        _balances[account] = value;
    }
}
