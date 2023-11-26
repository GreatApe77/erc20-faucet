// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "./erc20/ERC20.sol";

//  ______                                 __       ______                      ________ ________         ______            __
// /      \                               |  \     /      \                    |        \        \       /      \          |  \
//|  $$$$$$\  ______    ______    ______ _| $$_   |  $$$$$$\  ______    ______  \$$$$$$$$\$$$$$$$$      |  $$$$$$\ ______   \$$ _______
//| $$ __\$$ /      \  /      \  |      \   $$ \  | $$__| $$ /      \  /      \    /  $$    /  $$       | $$   \$$/      \ |  \|       \
//| $$|    \|  $$$$$$\|  $$$$$$\  \$$$$$$\$$$$$$  | $$    $$|  $$$$$$\|  $$$$$$\  /  $$    /  $$        | $$     |  $$$$$$\| $$| $$$$$$$\
//| $$ \$$$$| $$   \$$| $$    $$ /      $$| $$ __ | $$$$$$$$| $$  | $$| $$    $$ /  $$    /  $$         | $$   __| $$  | $$| $$| $$  | $$
//| $$__| $$| $$      | $$$$$$$$|  $$$$$$$| $$|  \| $$  | $$| $$__/ $$| $$$$$$$$/  $$    /  $$          | $$__/  \ $$__/ $$| $$| $$  | $$
// \$$    $$| $$       \$$     \ \$$    $$ \$$  $$| $$  | $$| $$    $$ \$$     \  $$    |  $$            \$$    $$\$$    $$| $$| $$  | $$
//  \$$$$$$  \$$        \$$$$$$$  \$$$$$$$  \$$$$  \$$   \$$| $$$$$$$   \$$$$$$$\$$      \$$              \$$$$$$  \$$$$$$  \$$ \$$   \$$
//                                                          | $$
//                                                          | $$
//                                                           \$$

/**
 * @title GreatApe77 Coin
 * @author Mateus Navarro
 * @notice Implementacao do token GreatApe77 Coin
 */
contract GreatApe77Coin is ERC20 {
    /**
     * @notice Criador do contrato
     */
    string public constant CREATOR = "Mateus Navarro";

    /**
     *
     * @param initialSupplyReceiver Endereco que recebera a quantidade total de tokens
     */
    constructor(
        address initialSupplyReceiver
    )
        ERC20(
            "GreatApe77 Coin",
            "GRTPC",
            77000000 ether,
            initialSupplyReceiver
        )
    {}
}
