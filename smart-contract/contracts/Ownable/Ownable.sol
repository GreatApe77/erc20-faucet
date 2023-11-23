// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IOwnable} from "./interfaces/IOwnable.sol";
import {IOwnableErrors} from "./interfaces/IOwnableErrors.sol";

/**
 * @title Ownable implementado por Mateus
 * @notice Implementacao do contrato Ownable
 */

contract Ownable is IOwnable, IOwnableErrors {
    /**
     * @dev Armazena o endereco do dono do contrato
     */
    address private _owner;
    /**
     * @notice Modificador que restringe o acesso a funcao apenas para o dono do contrato
     */
    modifier onlyOwner() {
        if(msg.sender != owner()){
            revert Ownable__notOwner();
        }
        _;
    }
    /**
     * @notice Construtor que define o dono do contrato como o endereco que o criou
     */
    constructor() {
        _owner = msg.sender;
    }
    /**
     * @notice Retorna o endereco do dono do contrato
     */
    function owner() public view override returns (address) {
        return _owner;
    }
    /**
     * @notice Só pode ser chamada pelo dono do contrato
     * @param newOwner Endereco do novo dono do contrato
     */
    function transferOwnership(address newOwner) external onlyOwner override {
        if(newOwner== address(0)){
            revert Ownable__newOwnerZeroAddress();
        }
        _setOwner(newOwner);
        emit OwnershipTransferred(msg.sender, newOwner);
    }
    /**
     * @notice Só pode ser chamada pelo dono do contrato
     * @notice Remove o dono do contrato Para sempre
     */
    function renounceOwnership() external onlyOwner override {
        _setOwner(address(0));
        emit OwnershipTransferred(msg.sender, address(0));
    }
    /**
     * @dev Funcao interna que define o endereco do dono do contrato
     * @param newOwner Endereco do novo dono do contrato
     */
    function _setOwner(address newOwner) internal {
        _owner = newOwner;
    }
}
