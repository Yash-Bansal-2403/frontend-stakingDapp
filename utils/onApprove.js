import { createERC20Instance } from "@/ethereum/createERC20";
import { ethers } from "ethers";
import currentConnectedAccount from "@/ethereum/currentConnectedAccount";
import { stakingContractAddress } from "@/ethereum/createStaking";
const onApprove = async (amount, setApprovedTokens) => {
  const erc20Contract = await createERC20Instance();
  const stakingAddress = await stakingContractAddress();

  const tx = await erc20Contract.increaseAllowance(
    stakingAddress,
    ethers.utils.parseEther(amount)
  );
  const receipt = await tx.wait(); //accessing receipt afetr txn is mined
  //console.log(receipt);
  //console.log(receipt.events[0].args.<indexed parameter name>);

  //await tx.wait(1);
  console.log("Token Approved");
  const owner = await currentConnectedAccount();

  const approvedTokensFromCall = await erc20Contract.allowance(
    owner,
    stakingAddress
  );

  setApprovedTokens(
    ethers.utils.formatEther(approvedTokensFromCall).toString()
  );
  //   console.log(
  //     "approved tokens",
  //     ethers.utils.formatEther(approvedTokensFromCall).toString()
  //   );
};
export default onApprove;
