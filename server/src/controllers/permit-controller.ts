import { Request, Response, NextFunction } from "express";
import { TypeUser } from "../@types/User";
import { signPermitTypedMessage } from "../utils/sign-permit-typed-message";
import { JsonRpcSigner, Wallet, ethers } from "ethers";
import { wallet } from "../config/web3-services";
import { provider } from "../config/web3-services";
import { permit } from "../services/permit";

export async function permitController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userCredentials = req.body.userCredentials as TypeUser;
  const { amount } = req.body;
  console.log({amount})
  
  const spender = wallet.address
  const fiveMinutesInTheFuture = (Math.ceil(Date.now()/1000))  + 300;
  const deadline = process.env.PERMIT_DEADLINE || fiveMinutesInTheFuture;
  const signer = new ethers.JsonRpcSigner(
    provider,
    userCredentials.custodyAccountPublicKey!
  );
  
  const signature = await signPermitTypedMessage(signer, {
    amount: BigInt(amount),
    deadline: Number(deadline),
    spender:spender,
  });
  const sigComponents = ethers.Signature.from(signature)
  try {
    const transactionResponse = await permit(
        userCredentials.custodyAccountPublicKey!,
        spender,
        amount,
        deadline,
        sigComponents.v,
        sigComponents.r,
        sigComponents.s
    )
    return res.status(200).json(
        {
            message:"Signed permit message!",
            transactionHash:transactionResponse.hash
        }
    )
  } catch (error) {
    console.error(error)
    return res.status(500).json({
        message:"Internal Server Error"
    })
  }
}
