import axios from "axios";
import { toast } from "react-toastify";
import { TOKEN } from "../constants";
import Cookies from "js-cookie";

const request = axios.create({
  baseURL: "https://ap-portfolio-backend.up.railway.app/api/v1",
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${Cookies.get(TOKEN)}`, 
  },
});

request.interceptors.response.use(
  (res) => res,
  (err) => {
    toast.error(err.response.data.message);
    return Promise.reject(err);
  }
);

export default request;
