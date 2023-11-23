// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

/**
 * @title ERC20 interface
 * @notice Interface ERC20 padrao listada em https://eips.ethereum.org/EIPS/eip-20
 */
interface IERC20 {
    /**
     * @notice Retorna o nome do token
     */
    function name() external view returns(string memory);
    /**
     * @notice Retorna o simbolo do token
     */
    function symbol() external view returns(string memory);
    /**
     * @notice Retorna a quantidade de casas decimais do token
     */
    function decimals() external view returns(uint8);
    /**
     * @notice Retorna o total de tokens em circulacao
     */
    function totalSupply() external view returns(uint256);
    /**
     * 
     * @param owner Endereco do dono dos tokens a terem o saldo consultado
     */
    function balanceOf(address owner) external view returns(uint256);
    /**
     * 
     * @param to Endereco do destinatario dos tokens
     * @param value Quantidade de tokens a serem transferidos
     */
    function transfer(address to, uint256 value) external returns(bool);
    /**
     * @notice Transfere tokens de um endereco para outro atraves de um endereco previamente aprovado
     * @param from Endereco do remetente dos tokens
     * @param to Endereco do destinatario dos tokens
     * @param value Quantidade de tokens a serem transferidos
     */
    function transferFrom(address from, address to, uint256 value) external returns(bool);
    /**
     * 
     * @param spender Endereco a ser aprovado para transferir tokens da conta que esta chamando a funcao
     * @param value Quantidade de tokens a serem aprovados
     */
    function approve(address spender, uint256 value) external returns(bool);
    /**
     * @notice Retorna a quantidade de tokens aprovados para um endereco especifico
     * @param owner Endereco do dono dos tokens 
     * @param spender Endereco a ser consultado para retornar a quantidade de tokens aprovados
     */
    function allowance(address owner, address spender) external view returns(uint256);
    /**
     * 
     * @param from O endereco de onde os tokens estao sendo transferidos
     * @param to O endereco de destino dos tokens
     * @param value A quantidade de tokens a serem transferidos
     */
    event Transfer(address indexed from, address indexed to, uint256 value);
    /**
     * 
     * @param owner O endereco do dono dos tokens que esta aprovando 
     * @param spender O endereco que esta sendo aprovado para transferir os tokens
     * @param value A quantidade de tokens a serem aprovados
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}