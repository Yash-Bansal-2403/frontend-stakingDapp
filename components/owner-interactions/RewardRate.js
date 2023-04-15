import { HomeContext } from "@/contexts/stakingContext";
import { createStakingInstance } from "@/ethereum/createStaking";
import useInputState from "@/hooks/useInputState";
import onNotify from "@/utils/onNotify";
import React, { useContext } from "react";

function RewardRate({ currRewardRate, setCurrRewardRate }) {
  //Ye meri KHUD ki definition h for my understanding..khi likhi n  dekhi mene sayad ho pr pt nhi...
  /** this is sasti state ,sasti states wo hoti h jo sirf user se input leti h and apne code ko de deti h bs baki fir code unhe use krke apni main states set krta h and acc. unse txn bhi bheta h sasti walio se..pr page pr render hoke dikhti nhi h n bhejne kke bad n first time m bs wo input box m dikhti h sasti wali bahar page pr nhi wha main sattes dikhti h jinhe hm ihdr udhr comeonents m ghumate h and chnage krwate h setter bhet h kuch ho to chsge kr dena taki screen updated dikeh... main staes owenrzInteraction m bnai and yha pass krwai hsasit sates sayd pass bhi n hoti ek components se dusre m agr wo page pr dikhani hi to ..ek hi m bnke wahi kahtm ho jati..jha use krni hoti h firm ya inout box ke liye whi bnate use krte h and khi amin state h t ouse isse upadte bhi krwa dete h uske settr ko idhr pass krwake.for using.. like stakedTokens and approvedTokens inhe for rendering and inke setters for chnging these values when something happend to need to update page ..etc sasti states like below jo h, user value lkeke code ko de rhi h..bs changed jo di whi jis bhi time dlke */
  //hme agr kisi state ko upadted dikhana ho uska data bahar se aand ho na duse user se bhi le kste ho to change b/c to ek chij ke liye dono type ki stae bnanai pdti h..ek main for rendering and ek for taking input sasti,,,yha currRewardRate iske props m aai h parent se use yha bnae ki jrurt nhi just use,,agr yha useefect chalate to first upadte render of page t oyhi main bhi bna leet pr iske parent m 3 compnenets ke liye ek hi instanse and use effect se kam ho rha h to jagh jagh kyu chalane whi se..upade kr do scrren ko and inhe button form ko wha render kra do..conext m use isiliye n banya taki yahi ek jagh pass krni thi  so kya bnate ..child m pass kr diya..
  const [rewardRate, updateRewardRate, resetRewardRate] = useInputState("");

  //this is below wali main or super main jo kai jagh used h and context se passesd h direct
  const { isDisabled, setIsDisabled } = useContext(HomeContext);

  const rewardRateHandler = async () => {
    try {
      setIsDisabled(true);
      //type to input tag hi number dalne dega
      if (rewardRate <= 0) {
        console.log("Enter valid input");
        resetRewardRate();
        throw new Error("Invalid Input");
      }
      //ise let bna ke dekhe(sbse upar useState ke apss and useEffect m initialize kro..)...nhi chl rha error aai annot read properties of undefined (reading 'setRewardRate')  pr kyu await se bnega bn jayega await h wait krega tbhi to yha aayega pr jruri nhi hm bich m bhi call kr skte pat nhi pr nhi chal rha  ??

      const stakingContract = await createStakingInstance(); //iske andr await h har function m likhna pd rha jha bhi need h is var. ki ah kya ise moralis ki trh hook bna ke...direct le skte h componet m sb mthds ke bahar like useState se jo lete h ,,ese hi moralis bhi to deta h contract creation ka  think about it ??ya wagmi kahi hook use krenge use bhi dekh lena
      const tx = await stakingContract.setRewardRate(rewardRate);
      await tx.wait(1);
      setCurrRewardRate(rewardRate);
      onNotify(true, `Reward Rate Changed to ${rewardRate} tokens per 1000 tokens staked`);
    } catch (err) {
      onNotify(false, "Transaction Failed 😞"); //agr ye fail hui to code fat jayega iska kuch kro ?? fir site reload krni pdti h wrna wo spinner hatata hi nhi...
      console.error(err);
    }
    resetRewardRate();
    setIsDisabled(false);
  };
  return (
    <div className="flex flex-col justify-content items-center">
      <div className="mx-5 font-bold"> Current Reward Rate : {currRewardRate} </div>
      <div className="text-sm text-gray-500">Reward Rate is no. of reward tokens per 1000 tokens staked for each reward period</div>
      <div className="flex flex-row justify-content items-center">
        <form className="bg-white p-6 rounded-lg  text-center ">
          <label htmlFor="rewardRate" className="block text-gray-700 font-bold mb-2"></label>
          <input
            id="rewardRate"
            type="number"
            name="rewardRate"
            placeholder="Reward Rate"
            value={rewardRate}
            className="border border-gray-300 py-2 px-2 rounded-md w-full"
            onChange={updateRewardRate}
          />
        </form>

        <button
          className={
            !isDisabled
              ? "bg-teal-500 hover:bg-yellow-400 rounded-xl px-1 py-1 ml-1 transition duration-300 ease-in-out shadow-lg text-lg"
              : "px-1 py-1 ml-1 bg-slate-600 rounded-xl shadow-lg text-lg text-slate-400 "
          }
          disabled={isDisabled}
          onClick={rewardRateHandler}
        >
          Change Reward Rate
        </button>
      </div>
    </div>
  );
}

export default RewardRate;
