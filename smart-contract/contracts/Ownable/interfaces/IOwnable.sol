// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

/**
 * @title Interface Ownable
 * @notice Interface para implementacao de contratos que possuem um dono
 */
interface IOwnable {
    /**
     * @notice Retorna o endereco do dono do contrato
     */
    function owner() external view returns (address);

    /**
     *
     * @param newOwner Endereco do novo dono do contrato
     */
    function transferOwnership(address newOwner) external;

    /**
     * @notice Remove o dono do contrato Para sempre
     */
    function renounceOwnership() external;
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );
    
}
