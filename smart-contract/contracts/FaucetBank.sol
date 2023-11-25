// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "./Ownable/Ownable.sol";
import {IERC20} from "./erc20/interfaces/IERC20.sol";

contract FaucetBank is Ownable {
    error FaucetBank__TokenNotSetted();

    IERC20 public greatApe77Coin;
    uint256 public claimAmount = 7 ether;
    uint256 public claimInterval = 2 minutes;

    event ClaimAmountChanged(uint256 indexed newAmount);
    event ClaimIntervalChanged(uint256 indexed newInterval);

    constructor(address tokenAddress) {
        greatApe77Coin = IERC20(tokenAddress);
    }

    function claimFaucets(address to) external onlyOwner {
        greatApe77Coin.transfer(to, claimAmount);
    }

    function withdrawAmount(uint256 amount) external onlyOwner {
        greatApe77Coin.transfer(msg.sender, amount);
    }

    function setTokenAddress(address tokenAddress) external onlyOwner {
        greatApe77Coin = IERC20(tokenAddress);
    }

    function setClaimAmount(uint256 amount) external onlyOwner {
        claimAmount = amount;
        emit ClaimAmountChanged(amount);
    }

    function setClaimIntervalInSeconds(
        uint256 intervalInSeconds
    ) external onlyOwner {
        claimInterval = intervalInSeconds;
        emit ClaimIntervalChanged(intervalInSeconds);
    }
}
