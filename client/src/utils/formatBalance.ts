import { ethers } from "ethers";

///const mainBalance = ethers.formatUnits(balance, 18).split(".")[0];
		//const decimalBalance = ethers.formatUnits(balance, 18).split(".")[1];
		//const balanceString = `${mainBalance}.${decimalBalance.slice(0, 2)}`;
export  function formatBalance(balance:bigint) {
    if(balance === 0n) return "0.00";
    const mainBalance = ethers.formatUnits(balance, 18).split(".")[0];
    const decimalBalance = ethers.formatUnits(balance, 18).split(".")[1];
    const balanceString = `${mainBalance}.${decimalBalance.slice(0, 2)}`;
    return balanceString;
}