import { createERC20Instance } from "@/ethereum/createERC20";
import { ethers } from "ethers";
import currentConnectedAccount from "@/ethereum/currentConnectedAccount";
import { stakingContractAddress } from "@/ethereum/createStaking";
const onApprove = async (amount, setApprovedTokens) => {
  const erc20Contract = await createERC20Instance();
  const stakingAddress = await stakingContractAddress();

  //sending txn to b/c so it will return the txn from it ,not return value even if contract method returning any value,,,we can see return value of state changing methods only in contract to other contract state changing method  call ..not from here ..if you want any value from state changing method then emit events from there..and extract here from txReceipt.events[0].args....indexed to simple name se mil jate h args.their name but non indexed yha kese dekhneg pta nhi ...??
  //state changing function ki return value yha se pdh hi n skte agr wo events m emit n ki h to , kyuki use call krne pr yha pe tx return hoga..
  const tx = await erc20Contract.increaseAllowance(
    stakingAddress,
    ethers.utils.parseEther(amount)
  ); //approve se puarane mitke new value approve hoti h jbki isse purani approved tokens +new add hoke allwance m aajte h..erc20 ke dono function dekh lena oz ke
  //by default 1 hi aata h kya tx.wait() m block Confirmations??
  //console.log(tx);
  const receipt = await tx.wait(); //accessing receipt afetr txn is mined
  //console.log(receipt);
  //console.log(receipt.events[0].args.<indexed parameter name>);

  //await tx.wait(1);
  console.log("Token Approved");
  const owner = await currentConnectedAccount();

  //view/pure contract method ko call h so txn nhi apni value hi return kr dega (jo wha se retrun ho rhi h,agr txn hota send krte to txn deta na value nhi..
  //vie m events fire nhi hote kyuki state hi change n hoti waha..
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
