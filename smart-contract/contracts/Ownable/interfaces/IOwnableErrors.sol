// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

/**
 * @title Interface Ownable
 * @notice Interface para implementacao de contratos que possuem um dono
 */

interface IOwnableErrors{
    /**
     * @notice Erro emitido quando o endereco que chamou a funcao nao e o dono do contrato
     */
    error Ownable__notOwner();
    /**
     * @notice Erro emitido quando o endereco do novo dono e o endereco zero
     */
    error Ownable__newOwnerZeroAddress();
}