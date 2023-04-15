import { HomeContext } from "@/contexts/stakingContext";
import { useContext, useState } from "react";
import Form from "./Form";
import Modal from "./Modal";

function Staking() {
  const [showModalCollect, setShowModalCollect] = useState(false);
  const { isDisabled } = useContext(HomeContext); //name se aate h objectd estructing m sequence se nhi jbki array destructring m m saayd sequnce se aate h name se nhi..(kisi bhi name m lo isliye hmara useInput stae kisi bhi nname m lene pr chl;tas h..sequnce wahi h and hmara useContext m se kisi bhi sequnce m lo jo us name se passed h usi m aayega..ya : lgake chnaged name m value le skte h...simple.)
  //use less and nneddde stae /contexts/code and m imp.  kam se kam rendring tbhi app achi productive bvngeig recta ki and usme..seo wala bhi tdka lg jaye..t omja ho aa jey..nextjs wale n sikhaya tha..._document.js use krke and metadat wagerah deke..Head(next ka Haed) deke..etc..

  return (
    <div>
      <button
        className={
          !isDisabled
            ? "bg-teal-500 hover:bg-yellow-400 rounded-xl px-4 py-2 mt-10 transition duration-300 ease-in-out shadow-lg"
            : " px-4 py-2 mt-10 bg-slate-600 rounded-xl shadow-lg text-lg text-slate-400 "
        }
        disabled={isDisabled}
        onClick={() => {
          setShowModalCollect(true);
        }}
      >
        Stake tokens
      </button>

      <Modal
        isVisible={showModalCollect}
        onClose={() => setShowModalCollect(false)}
      >
        <Form onClose={() => setShowModalCollect(false)} />
      </Modal>
    </div>
  );
}

export default Staking;
//3 errors
// 14 tokens suru m,,
//metmask chainid issue,,,fixed

//baki analyse krke dekh lena... ek bar withdraw,reward and send tokens ki functinalty bhi suru krke chla lo
//react hooks
//custom hooks
//utils for common functions and data
//context and reducers
//code restrusture modular(less to no repeating) ,clean, concise and easy to understand
//tx.wait kese kre jb value return ho b/c se
//state changes and re renderin relation..parent child,,state in return rendered to trigger re render sb check krna...and useEffect se relation
//account connected he pehle se aur agar usko badlenge to state change hone me dikkat aa rahi he page rerender nahi ho raha he
//re-rendering of the states and components---------useEffect ka chakkar babu bhaiya automatically nahi ho rahiu refresh karna pad raha he
//end to end thorough testing of every scenario and test case and testnet
//claiming rewardlogic and reward giving logic of contract not working properly
//contract side made properly testing an d contract events and errors

//wagmi and rainbowkit
// getServerSiderops and getStaticProps if applicable
//catch errors custom errors when txn rejected.....show them
//loading spinners buttens and disablineg butten on txn going
//notificatiob when txn completed
//code commenting and documentation😀
//owner all ineration with contract on his page,rewardrate ...code restructure and style better
//modal not closing after approve and stake complete
//first time metamsk m pwd dalke connect wallet krne se khud home page n aata..please connect walet dikhta h.. connect hone ke bad bhi..bs ye metamks m pwd dalke krne p hi hora h..baki sare disconnect rkke connect rke to sb shi chl jata h..see it..
