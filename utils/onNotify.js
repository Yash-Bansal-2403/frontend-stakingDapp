import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//is function ko context m bna ke sbhi compoent m pass lkr sket the but ise yha bnaya,,utils m chunki..states and unke setters ko context se pass krna shi h..ya koi useefect m value set rkke nitial wali sates contexts se pass krna shi h pr only reusable functions ke liye conetext se pass krna thi9k n lgta..use utils m rkhke compnenst m jha bhi need h call kr lo... agr ise states chaiye t o compnents se pass kra do..jha ye call hoga..simple... ya functions ke liye usereducers bhi use hota h uska pta nhi kese hota h so abhi ke liye t utils for functions jindabad..ye b/c se ineract bhi rk sket h..kruri chije import kr leneg yha call aati h fir jha se hm call rket execute hota h akam bna gya..javascript kafeatur h ye ese java m function parametr m apss n kr skte..n ese alkg file m direct likhke export krke call rk sket h bina class an duska objec t bnaye ..
//pr yha kes e class and objects kam krte h use n kiye kbhi dekhna..oops class,objects and typescript also....

const onNotify = (success, value) => {
  if (success) {
    toast.success(`${value}`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  } else {
    toast.error(`${value}`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  //   toast.warn("Warning Notification !", {
  //     position: toast.POSITION.BOTTOM_LEFT,
  //   });

  //   toast.info("Info Notification !", {
  //     position: toast.POSITION.BOTTOM_CENTER,
  //   });

  //   toast("Custom Style Notification with css class!", {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //     className: "foo-bar",
  //   });
};

export default onNotify;
