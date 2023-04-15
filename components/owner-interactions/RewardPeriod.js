import { HomeContext } from "@/contexts/stakingContext";
import { createStakingInstance } from "@/ethereum/createStaking";
import useInputState from "@/hooks/useInputState";
import onNotify from "@/utils/onNotify";
import React, { useContext } from "react";

function RewardPeriod({ currRewardPeriod, setCurrRewardPeriod }) {
  const [rewardPeriod, updateRewardPeriod, resetRewardPeriod] = useInputState(""); //try to make it in seconds and sync wiht b/c contract make sec ther also..or common name upar likh do code m kisme value deni h days(for real like app) ya seconds m(for our testing app)..contract m sayad days likha h pr cal. sec ke base p h (tbhi yha reward mil pa rha h days to milta hi n turant use clear krna phle
  const { isDisabled, setIsDisabled } = useContext(HomeContext);

  const rewardPeriodHandler = async () => {
    try {
      setIsDisabled(true);
      //type to input tag hi number dalne dega
      if (rewardPeriod <= 0) {
        console.log("Enter valid input");
        resetRewardPeriod();
        throw new Error("Invalid Input");
      }

      const stakingContract = await createStakingInstance();
      const tx = await stakingContract.setRewardPeriod(rewardPeriod);

      await tx.wait(1);
      setCurrRewardPeriod(rewardPeriod);
      onNotify(true, `Reward Period Changed to ${rewardPeriod} seconds to update reward`);
    } catch (err) {
      console.error(err);
      // const errorMessage = err.message;

      // // Use regular expressions to extract the error message
      // const regex = /reverted with custom error '(.+?)'/;
      // const matches = regex.exec(errorMessage);

      // if (matches) {
      //   const notAnOwnerError = matches[1]; // Extract the error message from the regex match
      //   console.log(notAnOwnerError); // Prints "Not_An_Owner()"
      // } else {
      //   console.log("Error message not found.");
      // }
      onNotify(false, `Transaction Failed `); //agr ye fail hui catch m to code fat jayega iska kuch kro ?? ya to kahi aur likho tb catch kro ya finally ya kuch dekho..ye vulnerable h
      // console.error(err);
    }
    resetRewardPeriod();
    setIsDisabled(false); //ek dam last m ,,hopefully last m hi chle await to isse phle chlenge hi jo iske upar lge sayd try/catch bhi agr try likha h to puara chlega syad pkka n pta ??..kya javascript itni random chlti h ya kisi base pr use chhod agl p jati jb bahr khi call ho usme await ho esa nhi simple cod bhi khi ka khi execute kro use line by line hi rkegi..
  };
  return (
    <div className="flex flex-col justify-content items-center">
      <div className="mx-5 font-bold"> Current Reward Period : {currRewardPeriod} seconds</div>
      <div className="text-sm text-gray-500">Reward Period is time in seconds in which you will get reward after each period</div>
      <div className="flex flex-row justify-content items-center">
        <form className="bg-white p-6 rounded-lg  text-center ">
          <label htmlFor="rewardPeriod" className="block text-gray-700 font-bold mb-2"></label>
          <input
            id="rewardPeriod"
            type="number"
            name="rewardPeriod"
            placeholder="Reward period"
            value={rewardPeriod}
            className="border border-gray-300 py-2 px-2 rounded-md w-full"
            onChange={updateRewardPeriod}
          />
        </form>

        <button
          className={
            !isDisabled
              ? "bg-teal-500 hover:bg-yellow-400 rounded-xl px-1 py-1 ml-1 transition duration-300 ease-in-out shadow-lg text-lg"
              : "px-1 py-1 ml-1 bg-slate-600 rounded-xl shadow-lg text-lg text-slate-400 "
          }
          disabled={isDisabled}
          onClick={rewardPeriodHandler}
        >
          Change Reward Period
        </button>
      </div>
    </div>
  );
}

export default RewardPeriod;
