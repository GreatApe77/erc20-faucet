// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "./Ownable/Ownable.sol";
import {IERC20} from "./erc20/interfaces/IERC20.sol";

/**
 * @title FaucetBank
 * @author Mateus Navarro
 * @notice Banco de faucets para o GreatApe77 Coin
 */
contract FaucetBank is Ownable {
    /**
     * @dev Erro lancado quando o endereco do token nao foi setado
     */
    error FaucetBank__TokenNotSetted();
    /**
     * @notice Token GreatApe77 Coin
     */
    IERC20 public greatApe77Coin;
    /**
     * @notice Quantidade de tokens que serao enviados a cada claim
     */
    uint256 public claimAmount = 7 ether;
    /**
     * @notice Intervalo de tempo entre cada claim
     */
    uint256 public claimInterval = 2 minutes;
    /**
     * @notice Evento emitido quando a quantidade de tokens que serao enviados a cada claim for alterada
     * @param newAmount Nova quantidade de tokens que serao enviados a cada claim
     */
    event ClaimAmountChanged(uint256 indexed newAmount);
    /**
     * @notice Evento emitido quando o intervalo de tempo entre cada claim for alterado
     * @param newInterval Novo intervalo de tempo entre cada claim
     */
    event ClaimIntervalChanged(uint256 indexed newInterval);

    /**
     * @param tokenAddress Endereco do token GreatApe77 Coin
     */
    constructor(address tokenAddress) {
        greatApe77Coin = IERC20(tokenAddress);
    }

    /**
     * @notice Envia tokens GreatApe77 Coin para um endereco
     * @param to Endereco que recebera os tokens
     */
    function claimFaucets(address to) external onlyOwner {
        greatApe77Coin.transfer(to, claimAmount);
    }

    /**
     * @notice o dono do banco de faucets pode retirar tokens GreatApe77 Coin
     * @param amount Quantidade de tokens que serao enviados
     */
    function withdrawAmount(uint256 amount) external onlyOwner {
        greatApe77Coin.transfer(msg.sender, amount);
    }

    /**
     * @notice configura o endereco do token GreatApe77 Coin
     * @param tokenAddress Endereco do token GreatApe77 Coin
     */
    function setTokenAddress(address tokenAddress) external onlyOwner {
        greatApe77Coin = IERC20(tokenAddress);
    }

    /**
     * @param amount Nova quantidade de tokens que serao enviados a cada claim
     */
    function setClaimAmount(uint256 amount) external onlyOwner {
        claimAmount = amount;
        emit ClaimAmountChanged(amount);
    }

    /**
     * @param intervalInSeconds Novo intervalo de tempo entre cada claim
     */
    function setClaimIntervalInSeconds(
        uint256 intervalInSeconds
    ) external onlyOwner {
        claimInterval = intervalInSeconds;
        emit ClaimIntervalChanged(intervalInSeconds);
    }
}
