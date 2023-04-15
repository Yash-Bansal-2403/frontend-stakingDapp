import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import supportedChains from "../helper-config";
import { createStakingInstance } from "@/ethereum/createStaking";
export const HomeContext = createContext();
export function HomeProvider(props) {
  //ye kb aur kyu chal rha h pta nmhi...
  //context m flow smjh nhi aa rha h yha in sb chijo ka,,na hi baki components m direct compnent ke andr is jesa lga ho to kbhi bhi chal jata h ye kyu chalta h..comonenet ke bahar ka pta nhi

  //ese hi context m yhi natak h,,useEffcet m koi depnedency  h yha se initialize ho to fans jayega yha aaye to reset fir niche jaye to new set ese to useEfect chlta rhega prye 2 4 chlke ruk jata h ???figure out the bloody flow including this outside nad context,useEffect and method call(asynchronously hot e h khud hi aage piche call,,ek ke bad ek likhe h fir bhi tb tk await n lga ho unpe. isme getChainId() getCurrentWalletConnected and addWalletLister() call ho rhe h --> useEffect() m yhi niche..ho rhe h dekho.) and return...<>,,
  console.log("outside everything");

  const [chainId, setChainId] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [stakingContractOwner, setStakingContractOwner] = useState("");

  useEffect(() => {
    console.log("inside useEffect");

    const setValue = async () => {
      try {
        const stakingContract = await createStakingInstance();
        const stakingContractOwnerFromCall = await stakingContract.i_owner();
        console.log("From call", stakingContractOwnerFromCall);
        setStakingContractOwner(stakingContractOwnerFromCall);
        console.log("inside setValue");
        getChainId();
        getCurrentWalletConnected();
        addWalletListener();
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        //opertaor shoortcircuit agr phla false to dusra check n krega jisse .toLowerCase undefined pr call nhi hoga and error nhi aayegi wrna ayegi
        if (
          accounts.length > 0 &&
          stakingContractOwnerFromCall.toLowerCase() ===
            accounts[0].toLowerCase()
        ) {
          //equal address hone pr bhi false aa rha h tha fir lowercase lgaya to chl gya pta nhi kyu???
          console.log("andar aaya");
          setIsOwner(true);
          //for firest time page reload it will check and setIsOwner accordingly baki time to acc. change hone por event lister h uska jb bhi acc. change hoga ye niche likha h chekga and state set hogi
        } else {
          setIsOwner(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    setValue();
  }, [isConnected]);
  //ye isConnected dependency lgai taki agr disconnect rkke connect kre to ye bdlegi to useEffect khud to chlega nhi dubara m (agr ise n de to )and owner false ho ajyega to ..ahr owner h currentuser to use true bna ske is useEffect ko chalke ..usi case ke liye baki firect tiem to ye useEffect khud chal jata h

  const addWalletListener = async () => {
    console.log("inside wallete listener");

    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("chainChanged", (chainId) => {
        const newChainId = parseInt(chainId).toString();
        setChainId(newChainId);
        console.log("Chain ID changed to", newChainId);
      });
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0 && !isConnected) {
          setIsConnected(true);
        } else if (accounts.length <= 0) {
          setIsConnected(false);
        }
        console.log("accounts changed to ", accounts[0]);
        setCurrentAccount(accounts[0]);
        //equal address hone pr bhi false aa rha h tha fir lowercase lgaya to chl gya pta nhi kyu???
        if (
          accounts.length > 0 &&
          stakingContractOwner.toLowerCase() == accounts[0].toLowerCase()
        ) {
          console.log("run true");
          setIsOwner(true);
        } else {
          console.log("run false");
          setIsOwner(false);
        }
      });
    } else {
      /* MetaMask is not installed */

      console.log("Please install MetaMask");
    }
  };
  const getCurrentWalletConnected = async () => {
    console.log("inside currenct walletConnected");

    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setIsConnected(true);
          setCurrentAccount(accounts[0]);

          console.log(`isConnected changed to ${isConnected}`);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };
  async function getChainId() {
    console.log("inside inside getchainId");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { chainId } = await provider.getNetwork();
    setChainId(chainId);
  }
  return (
    <HomeContext.Provider
      value={{
        isConnected,
        chainId,
        supportedChains,
        currentAccount,
        isDisabled,
        setIsDisabled,
        isOwner,
        stakingContractOwner,
      }}
    >
      {props.children}
    </HomeContext.Provider>
  );
}
