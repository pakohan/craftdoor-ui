import Axios from "axios";
import { SnackbarProgrammatic } from "buefy";

const axios = Axios.create();

axios.interceptors.response.use(
  response => {
    console.log(response);
    return response.data;
  },
  err => {
    console.error(err);
    console.log(JSON.stringify(err));
    console.log(err);
    SnackbarProgrammatic.open({
      duration: 5000,
      message: "" + err,
      type: "is-danger",
      position: "is-bottom-right"
    });
  }
);

export default axios;
