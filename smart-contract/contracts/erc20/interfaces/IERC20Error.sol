// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20Errors {
    error ERC20__transferFromZeroAddress();

    error ERC20__transferToZeroAddress();

    error ERC20__transferToSelf();

    error ERC20__transferInsufficientBalance();

    error ERC20__transferFromInsufficientBalance();

    error ERC20__transferAllowanceInsufficientBalance();

    error ERC20__transferFromInsufficientAllowance();
    error ERC20__transferFromFromAddressZero();
    error ERC20__transferFromToAddressZero();
    error ERC20__transferFromWithValueZero();

    error ERC20__approveToZeroAddress();

    error ERC20__approveFromZeroAddress();

    error ERC20__approveInsufficientBalance();

    error ERC20__approveFromInsufficientAllowance();
}
