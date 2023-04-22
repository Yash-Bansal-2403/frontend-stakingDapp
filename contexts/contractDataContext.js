import { createERC20Instance } from "@/ethereum/createERC20";
import {
  createStakingInstance,
  stakingContractAddress,
} from "@/ethereum/createStaking";
import currentConnectedAccount from "@/ethereum/currentConnectedAccount";
import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
// @ts-ignore
import { getAccount } from "@wagmi/core";
import { HomeContext } from "./stakingContext";

// @ts-ignore
export const ContractDataContext = createContext();

// @ts-ignore
export function ContractDataProvider(props) {
  const [stakedTokens, setStakedTokens] = useState("");
  const [totalSupply, setTotalSupply] = useState("0");
  const [approvedTokens, setApprovedTokens] = useState(0);
  // const [currentAccount, setCurrentAccount] = useState(null);
  const { currentAccount, chainId } = useContext(HomeContext);
  //const account = getAccount();
  useEffect(() => {
    const setValue = async () => {
      try {
        const erc20Contract = await createERC20Instance();
        const stakingContract = await createStakingInstance();
        const stakingAddress = await stakingContractAddress();
        const owner = await currentConnectedAccount();
        const approvedTokensFromCall = await erc20Contract.allowance(
          owner,
          stakingAddress
        );
        const totalSupplyFromCall =
          await stakingContract.getTotalStakedTokens();
        setApprovedTokens(
          // @ts-ignore
          ethers.utils.formatEther(approvedTokensFromCall).toString()
        );
        const stakedTokensFromCall =
          await stakingContract.getStakedBalanceOfUser(owner);
        setStakedTokens(
          ethers.utils.formatEther(stakedTokensFromCall).toString()
        );

        setTotalSupply(
          ethers.utils.formatEther(totalSupplyFromCall).toString()
        );
      } catch (err) {
        console.error(err);
      }
    };
    setValue();
  }, [approvedTokens, stakedTokens, currentAccount, chainId]);
  return (
    <// @ts-ignore
    ContractDataContext.Provider
      value={{
        stakedTokens,
        setStakedTokens,
        approvedTokens,
        setApprovedTokens,
        totalSupply,
      }}
    >
      {props.children}
    </ContractDataContext.Provider>
  );
}
