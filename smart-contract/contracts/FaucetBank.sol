// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {GreatApe77Coin} from "./GreatApe77Coin.sol";
import {Ownable} from "./Ownable/Ownable.sol";

contract FaucetBank is Ownable {
    error FaucetBank__GreatApe77CoinAlreadyCreated();

    enum CoinDeployedStatus {
        NOT_CREATED,
        CREATED
    }

    CoinDeployedStatus internal _coinStatus;
    GreatApe77Coin public greatApe77Coin;
    event CoinLaunched(address indexed coinAddress);
    function lauchCoin() external onlyOwner {
        if (_coinStatus == CoinDeployedStatus.CREATED) {
            revert FaucetBank__GreatApe77CoinAlreadyCreated();
        }
        _coinStatus = CoinDeployedStatus.CREATED;
        greatApe77Coin = new GreatApe77Coin();
        emit CoinLaunched(address(greatApe77Coin));
    }
}
