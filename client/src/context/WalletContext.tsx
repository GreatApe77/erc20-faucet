import { createContext,useState } from "react";
import { connectSigner } from "../web3-services/ConnectSigner";


export const WalletContext = createContext({account:"",connectWallet:()=>{},setAccount:()=>{}});
type Props ={
    children:React.ReactNode

}
export const WalletProvider = ({children}:Props )=>{

    const [account,setAccount] = useState<string>("");

    const connectWallet = async ()=>{
        const signer = await connectSigner();
        const address = await signer.getAddress();
        setAccount(address);
    }

    return (
        <WalletContext.Provider value={{account,connectWallet,setAccount}}>
            {children}
        </WalletContext.Provider>
    )
}