import { HomeContext } from "@/contexts/stakingContext";
import { createStakingInstance } from "@/ethereum/createStaking";

import onNotify from "@/utils/onNotify";
import React, { useContext } from "react";

function PauseWithdrawal({ pauseWithdrawal, setPauseWithdrawal }) {
  const { isDisabled, setIsDisabled } = useContext(HomeContext);

  const pauseWithdrawalHandler = async () => {
    //yha call aai button se ie. jo uska ulta wha bhi bje ke chnage kr do.. and yha bhi ulta kr do use jo b.c p kr diya..
    //tension n lo koi bhi ise call n kr skte..owner hi kr skta h..yha se kosis bhi ki bejni ki to b/c reject kr dgi owner ke alwa kisine contract is secured and this function is limite d to owner..goood
    try {
      setIsDisabled(true);
      //type to input tag hi number dalne dega

      const stakingContract = await createStakingInstance();
      const tx = await stakingContract.setPauseWithdrawalOfBalanceAndReward(!pauseWithdrawal);
      await tx.wait(1);
      setPauseWithdrawal(!pauseWithdrawal);
      onNotify(true, `Withdrawal ${!pauseWithdrawal ? "Paused" : "Activated"}`);
      //isem ! krke pass kiya kyuki turant set wala update n kr payega (onNotify call tk to bilkul nhi sayd catch se phle } tk kre ya sayd ye handle finish rkke kre upadet pta nhi pr kr jrur dega so final screen pr to upafdte value hi dikhegi wese fraction of seconds m ye hota h to scree pr hmesa upadted hi dikegi) so ise old value hi kmilegi pauseWithdrwal m so ! lgake kiya..
    } catch (err) {
      onNotify(false, "Transaction Failed 😞"); //agr ye fail hui catch m to code fat jayega iska kuch kro ?? ya to kahi aur likho tb catch kro ya finally ya kuch dekho..ye vulnerable h
      console.error(err);
    }
    setIsDisabled(false); //ek dam last m ,,hopefully last m hi chle await to isse phle chlenge hi jo iske upar lge sayd try/catch bhi agr try likha h to puara chlega syad pkka n pta ??..kya javascript itni random chlti h ya kisi base pr use chhod agl p jati jb bahr khi call ho usme await ho esa nhi simple cod bhi khi ka khi execute kro use line by line hi rkegi..
  };

  return (
    <div className="flex flex-col justify-center items-center mt-3">
      {" "}
      <button
        className={
          !isDisabled
            ? "bg-red-700 hover:bg-yellow-400 rounded-xl px-1 py-1 ml-1 transition duration-300 ease-in-out shadow-lg text-lg justify-center items-center"
            : "px-1 py-1 ml-1 bg-slate-600 rounded-xl shadow-lg text-lg text-slate-400 justify-center items-center "
        }
        disabled={isDisabled}
        onClick={pauseWithdrawalHandler}
      >
        {pauseWithdrawal ? "Activate" : "Pause"} withdrwal
      </button>
      <div className="text-base">Withdrawal is {pauseWithdrawal ? "Paused" : "Activated"}</div>
    </div>
  );
}

export default PauseWithdrawal;
