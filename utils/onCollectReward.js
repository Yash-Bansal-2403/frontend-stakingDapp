import { createStakingInstance } from "@/ethereum/createStaking";

const onCollectReward = async (setRewardTokens) => {
  const stakingContract = await createStakingInstance();

  const tx = await stakingContract.claimRewards();
  await tx.wait(1);
  //localhost chain pe block ko mine karne ke liye khud se transaction bhejna padta he warna vo aage mine nahi hota kyonki transaction to hua hi nahi
  // isiliye pehle stake ke baad reward generate nahi hoga localhost chain pe jab tak ki hum dusra transaction nahi bhejte kyonki block wahi ka wahi he
  console.log("Reward Collected");
  setRewardTokens(0);
};

export default onCollectReward;
