import axios from "axios";
const instance = axios.create({
  //baseURL: import.meta.env.VITE_URL_EP,
  baseURL: import.meta.env.VITE_URL_EP,
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
