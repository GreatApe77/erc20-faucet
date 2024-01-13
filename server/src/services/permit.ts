import { AddressLike, BigNumberish, BytesLike } from "ethers";
import { greatApe77CoinInstance } from "../config/web3-services";

export async function permit(
  owner: AddressLike,
  spender: AddressLike,
  amount: BigNumberish,
  deadline: BigNumberish,
  v: BigNumberish,
  r: BytesLike,
  s: BytesLike
) {
  const response = await greatApe77CoinInstance.permit(
    owner,
    spender,
    amount,
    deadline,
    v,
    r,
    s
  );
  return response
}
