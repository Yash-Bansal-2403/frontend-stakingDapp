import { createStakingInstance } from "@/ethereum/createStaking";

import { useEffect, useState } from "react";
import PauseWithdrawal from "./owner-interactions/PauseWithdrawal";
import RewardPeriod from "./owner-interactions/RewardPeriod";
import RewardRate from "./owner-interactions/RewardRate";
import React from "react";

function OwnerInteraction() {
  //main states jo ki page pr render hongi and yha value hond krengi and change krengi to pass to b/c..
  //sasti states wo hoti h jo sirf user se input leti h and apne code ko de deti h bs baki fir code unhe use krke apni main states set krta h and acc. unse txn bhi bheta h sasti walio se..pr page pr render hoke dikhti nhi h n bhejne kke bad n first time m bs wo input box m dikhti h sasti wali bahar page pr nhi wha main sattes dikhti h jinhe hm ihdr udhr comeonents m gghumate h and chnage krwate h setter bhet h kuch ho to chsge kr dena taki screen updated dikeh... main staes like these below and stakedTokens and approvedTokens..etc sast states like RewardRAte and reawaRd period m h user value lkeke code o de rhi h..bs changed jo di whi jis bhi time dlke
  const [currRewardRate, setCurrRewardRate] = useState("");

  const [currRewardPeriod, setCurrRewardPeriod] = useState("");

  //ise simple USeState kyuki input enetr n krwa rhe..bs clcik krwana h aur box bhi nhi jise reset krna ho..radio hota to bhi thoda krte ab to sirf button h
  const [pauseWithdrawal, setPauseWithdrawal] = useState(false); //iske liye extra stae for getting user input n chahiye kyuki jo h uska ulta hi de skta h jo use kya dega..button m dikha do jo h uska ulta ye kro and jo contract m set h wha se leke bs ulta bhejna h agr wo button click kre to ..ye asan h
  //make it yes no,and show it on both page..withdrwal is paused or disable button base on it here
  //phle radio button ki sochi pr usse behtar yhi lga jo ab kr rhe bs clcik hi to krwana h current value ke base p use dikha ke ki change kro ise if you want..confirm bs metamsk mangta hm nhi mang rhe rp wo mang leta h chunki txn bhej rhe for state change

  useEffect(() => {
    const setValue = async () => {
      const stakingContract = await createStakingInstance();
      const rewardRateFromCall = await stakingContract.getRewardRate();
      const rewardPeriodFromCall = await stakingContract.getRewardPeriod();
      const pauseWithdrawalFromCall = await stakingContract.getPauseWithdrawalOfBalanceAndReward(); //bool return
      setPauseWithdrawal(pauseWithdrawalFromCall);
      setCurrRewardRate(rewardRateFromCall.toString());
      setCurrRewardPeriod(rewardPeriodFromCall.toString());
    };
    setValue();
  }, []);

  return (
    <div className="flex flex-col justify-center">
      {/**passing down main states so that child comonenet can use it and change it when called to b/c,, and also yha bhi jruri h taki sbklo useEffect se lake first time value usme dal de..chahe to useEfcet bhi whi bna skte h and ye main states bhi chikd m pr fir iska koi use n rhega jese hmne udhar kiya tha withdraw wagerah m... ek bar ye krke dekha h so.. mainsetaes yhi sue effct se leke dikah rhe h suru m baki kachra bahar dal diya agr wha se main state chnge hone h to wh apass kr diye context krne ki ise jrurt nhi kyuki iske alawa ek hi jagh used h wo bhi child h to direct pass ho jayegi*/}
      <RewardRate currRewardRate={currRewardRate} setCurrRewardRate={setCurrRewardRate} />
      <hr />
      <RewardPeriod currRewardPeriod={currRewardPeriod} setCurrRewardPeriod={setCurrRewardPeriod} />
      {/** */} <PauseWithdrawal pauseWithdrawal={pauseWithdrawal} setPauseWithdrawal={setPauseWithdrawal} />
    </div>
  );
}

export default OwnerInteraction;
