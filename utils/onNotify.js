import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
